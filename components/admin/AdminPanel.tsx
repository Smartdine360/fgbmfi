"use client";

import Image from "next/image";
import { useActionState, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CalendarPlus, ImagePlus, Loader2, LogOut, MapPin, Trash2, UploadCloud } from "lucide-react";
import type { EventCategory, FellowshipEvent } from "@/data/events";
import type { GalleryCategory, GalleryItem } from "@/data/gallery";
import { deleteEvent, deletePhoto, saveEvent, signIn, signOut, uploadPhoto, type FormState } from "@/app/admin/actions";
import { cn, formatDate } from "@/lib/utils";

const field = "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-base font-normal normal-case tracking-normal text-navy-900 outline-none transition-colors focus:border-navy-900";
const label = "eyebrow block text-slate";
const optional = <span className="font-normal normal-case tracking-normal">(optional)</span>;
const primary = "bg-sunset inline-flex min-h-13 items-center justify-center gap-3 rounded-xl px-6 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-on-flame transition-[filter] hover:brightness-110 disabled:opacity-60";
const panel = "space-y-6 rounded-[2rem] border border-line bg-white p-7 shadow-[0_40px_80px_-50px_rgba(20,11,51,0.5)] sm:p-9 lg:sticky lg:top-28 lg:col-span-5";
const binButton = "grid size-11 shrink-0 place-items-center rounded-full border border-line text-slate transition-colors hover:border-flame-500 hover:text-flame-500 disabled:opacity-50";

function Notice({ state }: { state: FormState }) {
  if (!state?.message) return null;
  return (
    <p role="status" className={cn("rounded-xl px-4 py-3 text-sm font-medium", state.ok ? "bg-[#e3f4ec] text-[#14532d]" : "bg-flame-200/60 text-flame-700")}>
      {state.message}
    </p>
  );
}

export function SignInForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(async (previous: FormState, form: FormData) => {
    const result = await signIn(previous, form);
    if (result?.ok) router.refresh();
    return result;
  }, null);

  return (
    <form action={action} className="mx-auto max-w-md space-y-6 rounded-[2rem] border border-line bg-white p-8 shadow-[0_40px_80px_-50px_rgba(20,11,51,0.5)] sm:p-10">
      <div>
        <h2 className="font-serif text-3xl font-normal tracking-normal text-navy-900">Sign in</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate">Enter the admin password to manage the gallery and the events.</p>
      </div>
      <label className={label}>
        Password
        <input type="password" name="password" required autoComplete="current-password" className={field} />
      </label>
      <Notice state={state} />
      <button type="submit" disabled={pending} className={cn(primary, "w-full")}>
        {pending && <Loader2 aria-hidden className="size-4 animate-spin" />}
        Sign in
      </button>
    </form>
  );
}

/** Shrinks a photograph in the browser to a WebP (or JPEG) no wider or taller than 2000px, and reports its shape. */
async function prepare(file: File): Promise<{ blob: Blob; ratio: GalleryItem["ratio"] }> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  // WebP where the browser can make one (it is much smaller); otherwise a JPEG.
  const encode = (type: string, quality: number) => new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
  let blob = await encode("image/webp", 0.82);
  if (blob?.type !== "image/webp") blob = await encode("image/jpeg", 0.85);
  if (!blob) throw new Error("Could not read that photograph.");
  const shape = canvas.width / canvas.height;
  return { blob, ratio: shape > 1.15 ? "landscape" : shape < 0.87 ? "portrait" : "square" };
}

/**
 * What the two managers share: the chosen picture and its preview, sending the form with the picture shrunk first,
 * and removing an entry after asking.
 */
function useManager(send: (form: FormData) => Promise<FormState>, drop: (id: string) => Promise<FormState>) {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [state, setState] = useState<FormState>(null);
  const [busy, startTransition] = useTransition();
  const [removing, setRemoving] = useState<string | null>(null);

  const pick = (file: File | undefined) =>
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return file ? URL.createObjectURL(file) : null;
    });

  const submit = (data: FormData) =>
    startTransition(async () => {
      try {
        const file = data.get("photo");
        if (!(file instanceof File) || file.size === 0) return setState({ ok: false, message: "Choose a photograph first." });
        const { blob, ratio } = await prepare(file);
        data.set("photo", blob, "photo");
        data.set("ratio", ratio);
        const result = await send(data);
        setState(result);
        if (result?.ok) {
          form.current?.reset();
          pick(undefined);
          router.refresh();
        }
      } catch {
        setState({ ok: false, message: "That photograph could not be read. Please try a JPG or PNG file." });
      }
    });

  const remove = (id: string, question: string) => {
    if (!window.confirm(question)) return;
    setRemoving(id);
    startTransition(async () => {
      setState(await drop(id));
      setRemoving(null);
      router.refresh();
    });
  };

  return { form, preview, pick, state, busy, removing, submit, remove };
}

function PhotoPicker({ preview, pick }: { preview: string | null; pick: (file: File | undefined) => void }) {
  return (
    <label className="relative block cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-line bg-sand/60 transition-colors hover:border-navy-900/40">
      <input type="file" name="photo" accept="image/*" required className="sr-only" onChange={(e) => pick(e.target.files?.[0])} />
      {preview ? (
        // The preview is a local blob URL, which next/image cannot optimise.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="Preview of the chosen photograph" className="max-h-72 w-full object-contain" />
      ) : (
        <span className="flex flex-col items-center gap-3 px-6 py-12 text-center text-slate">
          <ImagePlus aria-hidden className="size-9 text-flame-500" />
          <span className="font-semibold text-navy-900">Choose a photograph</span>
          <span className="text-sm">JPG or PNG. Large pictures are resized automatically.</span>
        </span>
      )}
    </label>
  );
}

function GalleryManager({ items, categories }: { items: GalleryItem[]; categories: GalleryCategory[] }) {
  const { form, preview, pick, state, busy, removing, submit, remove } = useManager(uploadPhoto, deletePhoto);
  return (
    <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
      <form ref={form} action={submit} className={panel}>
        <div>
          <h2 className="font-serif text-3xl font-normal tracking-normal text-navy-900">Add a photograph</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">It appears on the Gallery page as soon as it is uploaded.</p>
        </div>
        <PhotoPicker preview={preview} pick={pick} />
        <label className={label}>
          Caption {optional}
          <input type="text" name="caption" maxLength={120} placeholder="e.g. Fellowship breakfast, March 2026" className={field} />
        </label>
        <label className={label}>
          Category
          <select name="category" required defaultValue="Fellowship" className={field}>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <Notice state={state} />
        <button type="submit" disabled={busy} className={cn(primary, "w-full")}>
          {busy ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <UploadCloud aria-hidden className="size-4" />}
          Upload to gallery
        </button>
      </form>

      <div className="lg:col-span-7">
        <h2 className="font-serif text-3xl font-normal tracking-normal text-navy-900">
          Uploaded photographs <span className="text-slate">({items.length})</span>
        </h2>
        {items.length === 0 ? (
          <p className="mt-5 rounded-2xl border border-line bg-white p-8 leading-relaxed text-slate">Nothing has been uploaded yet. Photographs you add will be listed here, and shown first on the Gallery page.</p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item.id} className="overflow-hidden rounded-2xl border border-line bg-white">
                <div className="relative aspect-[3/2] bg-navy-900">
                  <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw" className="object-cover" />
                </div>
                <div className="flex items-start justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="eyebrow text-flame-700">{item.category}</p>
                    <p className={cn("mt-1 break-words leading-snug", item.caption ? "font-semibold text-navy-900" : "text-slate")}>{item.caption || "No caption"}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.id, `Remove ${item.caption ? `“${item.caption}”` : "this photograph"} from the gallery? This cannot be undone.`)}
                    disabled={busy}
                    aria-label={`Remove ${item.caption || "photograph"}`}
                    className={binButton}
                  >
                    {removing === item.id ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <Trash2 aria-hidden className="size-4" />}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function EventsManager({ events, categories }: { events: FellowshipEvent[]; categories: EventCategory[] }) {
  const { form, preview, pick, state, busy, removing, submit, remove } = useManager(saveEvent, deleteEvent);
  return (
    <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
      <form ref={form} action={submit} className={panel}>
        <div>
          <h2 className="font-serif text-3xl font-normal tracking-normal text-navy-900">Add an event</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">It appears on the Events page straight away. Once its date has passed it moves to &ldquo;Past Events&rdquo; by itself.</p>
        </div>
        <PhotoPicker preview={preview} pick={pick} />
        <label className={label}>
          Title
          <input type="text" name="title" required maxLength={120} placeholder="e.g. Fellowship Breakfast" className={field} />
        </label>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className={label}>
            Date
            <input type="date" name="date" required className={field} />
          </label>
          <label className={label}>
            Time {optional}
            <input type="text" name="time" maxLength={60} placeholder="e.g. 7:30 am – 9:00 am" className={field} />
          </label>
        </div>
        <label className={label}>
          Venue {optional}
          <input type="text" name="location" maxLength={120} placeholder="e.g. AZ @ Paya Lebar, #03-08" className={field} />
        </label>
        <label className={label}>
          Category
          <select name="category" required defaultValue="Fellowship" className={field}>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className={label}>
          Details {optional}
          <textarea name="summary" rows={5} maxLength={600} placeholder="What the event is about, who is speaking, how to register…" className={cn(field, "resize-y")} />
        </label>
        <Notice state={state} />
        <button type="submit" disabled={busy} className={cn(primary, "w-full")}>
          {busy ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <CalendarPlus aria-hidden className="size-4" />}
          Publish event
        </button>
      </form>

      <div className="lg:col-span-7">
        <h2 className="font-serif text-3xl font-normal tracking-normal text-navy-900">
          Events <span className="text-slate">({events.length})</span>
        </h2>
        {events.length === 0 ? (
          <p className="mt-5 rounded-2xl border border-line bg-white p-8 leading-relaxed text-slate">No events have been added yet. The Events page tells visitors to check back soon until you publish one here.</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {events.map((event) => (
              <li key={event.id} className="flex gap-4 overflow-hidden rounded-2xl border border-line bg-white p-3 sm:gap-5">
                <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-navy-900 sm:w-32">
                  <Image src={event.image.src} alt="" fill sizes="8rem" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1 py-1">
                  <p className="eyebrow text-flame-700">
                    {formatDate(event.date)} · {event.category}
                  </p>
                  <p className="mt-1.5 break-words font-serif text-xl leading-snug text-navy-900">{event.title}</p>
                  {(event.time || event.location) && (
                    <p className="mt-1.5 flex items-start gap-1.5 text-sm text-slate">
                      {event.location && <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-flame-500" />}
                      {[event.time, event.location].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
                <button type="button" onClick={() => remove(event.id, `Remove “${event.title}” from the Events page? This cannot be undone.`)} disabled={busy} aria-label={`Remove ${event.title}`} className={cn(binButton, "self-center")}>
                  {removing === event.id ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <Trash2 aria-hidden className="size-4" />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

type Props = {
  photos: GalleryItem[];
  galleryCategories: GalleryCategory[];
  events: FellowshipEvent[];
  eventCategories: EventCategory[];
  storage: "cloudinary" | "disk";
  willLoseUploads: boolean;
};

const tabs = [
  { id: "gallery", label: "Gallery" },
  { id: "events", label: "Events" },
] as const;

export function Dashboard({ photos, galleryCategories, events, eventCategories, storage, willLoseUploads }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("gallery");
  const [leaving, startTransition] = useTransition();
  const counts = { gallery: photos.length, events: events.length };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="What to manage" className="inline-flex rounded-full border border-line bg-white p-1.5">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn("min-h-11 rounded-full px-6 text-[0.8rem] font-bold uppercase tracking-[0.12em] transition-colors", tab === t.id ? "bg-navy-900 text-white" : "text-slate hover:text-navy-900")}
            >
              {t.label} <span className={tab === t.id ? "text-white/60" : "text-slate/70"}>({counts[t.id]})</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={leaving}
          onClick={() =>
            startTransition(async () => {
              await signOut();
              router.refresh();
            })
          }
          className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate hover:text-navy-900"
        >
          <LogOut aria-hidden className="size-4" />
          Sign out
        </button>
      </div>

      <p className="mt-4 text-sm text-slate">Pictures are stored in: {storage === "cloudinary" ? "Cloudinary" : "the storage folder on this server"}.</p>
      {willLoseUploads && (
        <p role="alert" className="mt-4 rounded-xl bg-flame-200/60 px-4 py-3 text-sm font-medium text-flame-700">
          This host does not keep uploaded files. Add the three Cloudinary settings in the hosting dashboard, or anything uploaded here will disappear.
        </p>
      )}

      <div className="mt-8">{tab === "gallery" ? <GalleryManager items={photos} categories={galleryCategories} /> : <EventsManager events={events} categories={eventCategories} />}</div>
    </div>
  );
}
