import type { Metadata } from "next";
import { Suspense } from "react";
import { adminConfigured, isAdmin } from "@/lib/admin-session";
import { eventCategories } from "@/data/events";
import { getEvents } from "@/lib/events-store";
import { galleryCategories, getUploadedGallery } from "@/lib/gallery-store";
import { storageKind } from "@/lib/media-store";
import { Dashboard, SignInForm } from "@/components/admin/AdminPanel";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

/** Reads the sign-in cookie, so it renders per request behind the Suspense boundary below. */
async function Panel() {
  if (!adminConfigured()) {
    return (
      <p className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-8 leading-relaxed text-slate">
        The admin panel has no password yet. Add a line <code className="font-semibold text-navy-900">ADMIN_PASSWORD=…</code> (at least 8 characters) to the file <code className="font-semibold text-navy-900">.env.local</code> and restart the site.
      </p>
    );
  }
  if (!(await isAdmin())) return <SignInForm />;
  const [photos, events] = await Promise.all([getUploadedGallery(), getEvents()]);
  return <Dashboard photos={photos} galleryCategories={galleryCategories} events={events} eventCategories={eventCategories} storage={storageKind()} willLoseUploads={storageKind() === "disk" && !!process.env.VERCEL} />;
}

export default function AdminPage() {
  return (
    <>
      <section className="bg-navy-950 pb-12 pt-36 text-white">
        <div className="container-page">
          <p className="eyebrow text-flame-300">Admin panel</p>
          <h1 className="mt-4 font-serif text-5xl font-normal tracking-[-0.01em] sm:text-6xl">
            Gallery <em className="text-flame-300">&amp; events</em>
          </h1>
        </div>
      </section>
      <section className="bg-sand py-14 md:py-20">
        <div className="container-page">
          <Suspense fallback={<p className="text-slate">Loading…</p>}>
            <Panel />
          </Suspense>
        </div>
      </section>
    </>
  );
}
