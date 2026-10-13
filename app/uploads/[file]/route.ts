import { readFile } from "node:fs/promises";
import { uploadPath } from "@/lib/media-store";

/** Serves a photograph that was added through the admin panel. */
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const file = uploadPath((await params).file);
  if (!file) return new Response("Not found", { status: 404 });
  try {
    const bytes = await readFile(file);
    // Each upload has its own random name and is never rewritten, so it can be cached for good.
    return new Response(new Uint8Array(bytes), { headers: { "Content-Type": file.endsWith(".webp") ? "image/webp" : "image/jpeg", "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
