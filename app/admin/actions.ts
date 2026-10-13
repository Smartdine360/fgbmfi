"use server";

import { updateTag } from "next/cache";
import { eventCategories, type EventCategory } from "@/data/events";
import type { GalleryCategory, GalleryItem } from "@/data/gallery";
import { adminConfigured, endAdminSession, isAdmin, passwordMatches, startAdminSession } from "@/lib/admin-session";
import { EVENTS_TAG, ISO_DATE } from "@/lib/events-store";
import { GALLERY_TAG, galleryCategories, galleryRatios } from "@/lib/gallery-store";
import { addEntry, MAX_UPLOAD_BYTES, removeEntry, type Collection } from "@/lib/media-store";

export type FormState = { ok: boolean; message: string } | null;

export async function signIn(_state: FormState, form: FormData): Promise<FormState> {
  if (!adminConfigured()) return { ok: false, message: "No admin password has been set on the server yet." };
  // Slows down anyone guessing passwords.
  await new Promise((r) => setTimeout(r, 600));
  if (!passwordMatches(String(form.get("password") ?? ""))) return { ok: false, message: "That password is not right." };
  await startAdminSession();
  return { ok: true, message: "" };
}

export async function signOut() {
  await endAdminSession();
}

const text = (form: FormData, name: string, max: number) => String(form.get(name) ?? "").trim().slice(0, max);

/** Reads the picture from a form. The admin page shrinks it to a WebP (or JPEG) before sending it. */
async function readPicture(form: FormData): Promise<{ bytes: Buffer; type: "webp" | "jpg" } | { error: string }> {
  const photo = form.get("photo");
  if (!(photo instanceof File) || photo.size === 0) return { error: "Choose a photograph first." };
  if (photo.size > MAX_UPLOAD_BYTES) return { error: "That photograph is too large." };
  const bytes = Buffer.from(await photo.arrayBuffer());
  // Only real WebP or JPEG data is kept, whatever the file claims to be.
  const webp = bytes.subarray(0, 4).toString("latin1") === "RIFF" && bytes.subarray(8, 12).toString("latin1") === "WEBP";
  const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (!webp && !jpeg) return { error: "That file is not a photograph we can use." };
  return { bytes, type: webp ? "webp" : "jpg" };
}

async function save(collection: Collection, tag: string, form: FormData, fields: Record<string, string>, done: string): Promise<FormState> {
  const picture = await readPicture(form);
  if ("error" in picture) return { ok: false, message: picture.error };
  try {
    await addEntry(collection, picture.bytes, picture.type, fields);
  } catch (error) {
    console.error(error);
    return { ok: false, message: "It could not be saved. Please try again." };
  }
  updateTag(tag);
  return { ok: true, message: done };
}

async function remove(collection: Collection, tag: string, id: string, done: string): Promise<FormState> {
  if (!(await isAdmin())) return { ok: false, message: "Please sign in again." };
  try {
    await removeEntry(collection, id);
  } catch (error) {
    console.error(error);
    return { ok: false, message: "It could not be removed. Please try again." };
  }
  updateTag(tag);
  return { ok: true, message: done };
}

/** Adds one photograph to the gallery. */
export async function uploadPhoto(form: FormData): Promise<FormState> {
  if (!(await isAdmin())) return { ok: false, message: "Please sign in again." };
  const caption = text(form, "caption", 120);
  const category = text(form, "category", 40) as GalleryCategory;
  const ratio = text(form, "ratio", 20) as GalleryItem["ratio"];
  if (!galleryCategories.includes(category) || !galleryRatios.includes(ratio)) return { ok: false, message: "Please choose a category." };
  return save("gallery", GALLERY_TAG, form, { caption, category, ratio }, caption ? `Added “${caption}”.` : "Photograph added.");
}

export async function deletePhoto(id: string): Promise<FormState> {
  return remove("gallery", GALLERY_TAG, id, "Photograph removed.");
}

/** Adds one event to the Events page. */
export async function saveEvent(form: FormData): Promise<FormState> {
  if (!(await isAdmin())) return { ok: false, message: "Please sign in again." };
  const title = text(form, "title", 120);
  const date = text(form, "date", 10);
  const category = text(form, "category", 40) as EventCategory;
  if (!title) return { ok: false, message: "Please give the event a title." };
  if (!ISO_DATE.test(date) || Number.isNaN(Date.parse(date))) return { ok: false, message: "Please choose the date of the event." };
  if (!eventCategories.includes(category)) return { ok: false, message: "Please choose a category." };
  return save("events", EVENTS_TAG, form, { title, date, time: text(form, "time", 60), location: text(form, "location", 120), category, summary: text(form, "summary", 600) }, `Added “${title}”.`);
}

export async function deleteEvent(id: string): Promise<FormState> {
  return remove("events", EVENTS_TAG, id, "Event removed.");
}
