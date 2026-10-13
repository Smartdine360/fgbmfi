"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { contact } from "@/data/site";
import { cn } from "@/lib/utils";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

const field = "peer w-full border-0 border-b border-navy-900/25 bg-transparent px-0 pb-3 pt-6 text-base text-navy-900 placeholder-transparent transition-colors focus:border-flame-500 focus:outline-none focus:ring-0";
const label = "pointer-events-none absolute left-0 top-0 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate transition-colors peer-focus:text-flame-700";

type Props = { subjects: string[]; defaultSubject?: string; submitLabel?: string; source: string };

// Messages are delivered to the fellowship's inbox (contact.email in data/site.ts) by FormSubmit (formsubmit.co),
// which needs no password: the owner of the inbox confirms once, from an email FormSubmit sends on the first message.
const ENDPOINT = `https://formsubmit.co/ajax/${contact.email}`;

/** Enquiry form used on the Contact page. */
export function EnquiryForm({ subjects, defaultSubject, submitLabel = "Send Message", source }: Props) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const { name, email, phone, subject, message, company } = Object.fromEntries(new FormData(form)) as Record<string, string>;
    // Bots fill the hidden field; pretend it worked and drop the message.
    if (company) return setStatus({ state: "sent" });
    setStatus({ state: "sending" });
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        // Names starting with an underscore are settings for FormSubmit, not part of the message.
        body: JSON.stringify({ Name: name, Email: email, Phone: phone || "Not given", Subject: subject, Message: message, _subject: `Website enquiry: ${subject} (${name})`, _replyto: email, _template: "table", _captcha: "false" }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      if (!res.ok || String(data.success) !== "true") throw new Error();
      form.reset();
      setStatus({ state: "sent" });
    } catch {
      setStatus({ state: "error", message: `We could not send your message just now. Please try again in a few minutes, or email us at ${contact.email}.` });
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status.state === "sent" ? (
        <motion.div key="sent" role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="border border-line bg-white p-8 sm:p-12">
          <CheckCircle2 aria-hidden className="size-10 text-flame-500" strokeWidth={1.4} />
          <h3 className="mt-6 text-3xl text-navy-900">Thank you. Your message is on its way.</h3>
          <p className="mt-3 text-slate">Someone from the fellowship will reply to you personally.</p>
          <button type="button" onClick={() => setStatus({ state: "idle" })} className="mt-8 min-h-11 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-navy-900 underline decoration-flame-500 underline-offset-8">
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0 }} className="grid gap-x-8 gap-y-7 sm:grid-cols-2" noValidate={false}>
          <div className="relative">
            <input id={`${source}-name`} name="name" required autoComplete="name" placeholder="Name" className={field} />
            <label htmlFor={`${source}-name`} className={label}>
              Name <span aria-hidden>*</span>
            </label>
          </div>
          <div className="relative">
            <input id={`${source}-email`} name="email" type="email" required autoComplete="email" placeholder="Email" className={field} />
            <label htmlFor={`${source}-email`} className={label}>
              Email <span aria-hidden>*</span>
            </label>
          </div>
          <div className="relative">
            <input id={`${source}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="Phone" className={field} />
            <label htmlFor={`${source}-phone`} className={label}>
              Phone <span className="font-medium normal-case tracking-normal">(optional)</span>
            </label>
          </div>
          <div className="relative">
            <select id={`${source}-subject`} name="subject" required defaultValue={defaultSubject ?? subjects[0]} className={cn(field, "appearance-none rounded-none pr-6")}>
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <label htmlFor={`${source}-subject`} className={label}>
              Subject <span aria-hidden>*</span>
            </label>
            <span aria-hidden className="pointer-events-none absolute bottom-4 right-1 size-2 rotate-45 border-b border-r border-navy-900/60" />
          </div>
          <div className="relative sm:col-span-2">
            <textarea id={`${source}-message`} name="message" required rows={5} placeholder="Message" className={cn(field, "resize-y")} />
            <label htmlFor={`${source}-message`} className={label}>
              Message <span aria-hidden>*</span>
            </label>
          </div>
          {/* Honeypot: hidden from people, tempting to bots. */}
          <div aria-hidden className="absolute -left-[9999px]">
            <label>
              Leave this field empty
              <input name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status.state === "sending"}
              className="group inline-flex min-h-14 w-full items-center justify-center gap-3 bg-navy-900 px-9 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-navy-700 disabled:opacity-70 sm:w-auto"
            >
              {status.state === "sending" ? "Sending" : submitLabel}
              {status.state === "sending" ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
            </button>
            <p className="text-xs text-slate">Fields marked * are required.</p>
          </div>
          <div aria-live="assertive" className="sm:col-span-2">
            {status.state === "error" && <p className="border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-900">{status.message}</p>}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
