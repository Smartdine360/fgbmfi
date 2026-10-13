import { createHash, randomBytes } from "node:crypto";
import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Where everything added through the admin panel is kept: a picture plus a few
 * text fields per entry, in one of two collections (the gallery and the events).
 *
 * On a host that keeps no files (Vercel), entries are kept in Cloudinary: set
 * CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET and every
 * upload goes there, with its text fields stored alongside the picture.
 *
 * Without those three settings (on your own computer) the pictures are kept in
 * /storage/uploads and the fields in /storage/<collection>.json, and the
 * pictures are served at /uploads/<file> by app/uploads/[file]/route.ts.
 */
export type Collection = "gallery" | "events";
export type Entry = { id: string; src: string; addedAt: string; fields: Record<string, string> };

// Vercel accepts request bodies up to 4.5 MB; the admin page shrinks pictures well below this before sending them.
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

/* ------------------------------- Cloudinary ------------------------------- */

// Each collection has its own folder and tag, which is how its entries are found again.
const cloudFolder = (collection: Collection) => `fgbmfi-${collection}`;

function cloud() {
  const { CLOUDINARY_CLOUD_NAME: name, CLOUDINARY_API_KEY: key, CLOUDINARY_API_SECRET: secret } = process.env;
  return name && key && secret ? { name, key, secret, api: `https://api.cloudinary.com/v1_1/${name}` } : null;
}
type Cloud = NonNullable<ReturnType<typeof cloud>>;

/** Where uploads are kept, for the admin page to show. */
export const storageKind = (): "cloudinary" | "disk" => (cloud() ? "cloudinary" : "disk");

/** A form for one of Cloudinary's signed calls: the given fields plus the time, the key and the signature. */
function signedForm(c: Cloud, fields: Record<string, string>) {
  const all: Record<string, string> = { ...fields, timestamp: String(Math.floor(Date.now() / 1000)) };
  const toSign = Object.keys(all)
    .sort()
    .map((k) => `${k}=${all[k]}`)
    .join("&");
  const form = new FormData();
  for (const [k, v] of Object.entries(all)) form.set(k, v);
  form.set("api_key", c.key);
  form.set("signature", createHash("sha1").update(toSign + c.secret).digest("hex"));
  return form;
}

async function cloudCall(c: Cloud, action: "upload" | "destroy", form: FormData) {
  const res = await fetch(`${c.api}/image/${action}`, { method: "POST", body: form });
  if (!res.ok) throw new Error(`Cloudinary ${action} failed (${res.status}): ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

// In Cloudinary's "context" field, | separates entries and = separates a name from its value.
const contextValue = (text: string) => text.replace(/[|=\\]/g, "\\$&");

type CloudResource = { public_id: string; secure_url: string; created_at: string; context?: { custom?: Record<string, string> } };

async function cloudList(c: Cloud, collection: Collection): Promise<Entry[]> {
  const res = await fetch(`${c.api}/resources/image/tags/${cloudFolder(collection)}?context=true&max_results=500`, { headers: { Authorization: `Basic ${Buffer.from(`${c.key}:${c.secret}`).toString("base64")}` } });
  if (!res.ok) {
    // The public pages still show whatever ships with the site.
    console.error(`Cloudinary list failed (${res.status}): ${(await res.text()).slice(0, 200)}`);
    return [];
  }
  const { resources } = (await res.json()) as { resources: CloudResource[] };
  return resources.map((r) => ({ id: r.public_id, src: r.secure_url, addedAt: r.created_at, fields: r.context?.custom ?? {} }));
}

/* ---------------------------------- Disk ---------------------------------- */

const DIR = path.join(process.cwd(), "storage");
const UPLOADS = path.join(DIR, "uploads");
const indexFile = (collection: Collection) => path.join(DIR, `${collection}.json`);

type Stored = { id: string; file: string; addedAt: string; fields?: Record<string, string> } & Record<string, unknown>;

const FILE_NAME = /^[a-f0-9]{24}\.(webp|jpg)$/;
/** The path on disk of an uploaded picture, or null if the name is not one of ours. */
export const uploadPath = (file: string) => (FILE_NAME.test(file) ? path.join(UPLOADS, file) : null);

async function readIndex(collection: Collection): Promise<Stored[]> {
  try {
    return JSON.parse(await readFile(indexFile(collection), "utf8"));
  } catch {
    return [];
  }
}

async function writeIndex(collection: Collection, items: Stored[]) {
  await mkdir(DIR, { recursive: true });
  // Written beside the index and then swapped in, so a crash cannot leave half a file.
  const draft = `${indexFile(collection)}.${randomBytes(4).toString("hex")}.tmp`;
  await writeFile(draft, JSON.stringify(items, null, 2));
  await rename(draft, indexFile(collection));
}

// Early gallery uploads kept their caption and category beside the file name instead of under `fields`.
const storedFields = ({ fields, ...rest }: Stored): Record<string, string> =>
  fields ?? Object.fromEntries(Object.entries(rest).filter(([k, v]) => !["id", "file", "addedAt"].includes(k) && typeof v === "string")) as Record<string, string>;

/* --------------------------------- Shared --------------------------------- */

/** Every entry in a collection, newest first. */
export async function listEntries(collection: Collection): Promise<Entry[]> {
  const c = cloud();
  const entries = c ? await cloudList(c, collection) : (await readIndex(collection)).map((s) => ({ id: s.id, src: `/uploads/${s.file}`, addedAt: s.addedAt, fields: storedFields(s) }));
  return entries.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
}

export async function addEntry(collection: Collection, bytes: Buffer, type: "webp" | "jpg", fields: Record<string, string>) {
  const c = cloud();
  if (c) {
    const form = signedForm(c, {
      folder: cloudFolder(collection),
      tags: cloudFolder(collection),
      context: Object.entries(fields)
        .map(([k, v]) => `${k}=${contextValue(v)}`)
        .join("|"),
    });
    form.set("file", new Blob([new Uint8Array(bytes)], { type: type === "webp" ? "image/webp" : "image/jpeg" }), `photo.${type}`);
    await cloudCall(c, "upload", form);
    return;
  }
  const id = randomBytes(12).toString("hex");
  await mkdir(UPLOADS, { recursive: true });
  await writeFile(path.join(UPLOADS, `${id}.${type}`), bytes);
  await writeIndex(collection, [{ id, file: `${id}.${type}`, addedAt: new Date().toISOString(), fields }, ...(await readIndex(collection))]);
}

export async function removeEntry(collection: Collection, id: string) {
  const c = cloud();
  if (c) {
    // Only pictures in the collection's own folder can be removed from here.
    if (!id.startsWith(`${cloudFolder(collection)}/`)) return;
    await cloudCall(c, "destroy", signedForm(c, { public_id: id, invalidate: "true" }));
    return;
  }
  const items = await readIndex(collection);
  const stored = items.find((i) => i.id === id);
  if (!stored) return;
  await writeIndex(collection, items.filter((i) => i.id !== id));
  const file = uploadPath(stored.file);
  if (file) await unlink(file).catch(() => {});
}
