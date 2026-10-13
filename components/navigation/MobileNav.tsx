"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { mainNav, site } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Full-screen menu for phones and tablets. Traps focus, locks scroll and closes on Escape. */
export function MobileNav({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-navy-950 text-white xl:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="container-page flex h-[4.5rem] shrink-0 items-center justify-between">
            <Logo light onClick={onClose} />
            <button type="button" onClick={onClose} aria-label="Close menu" className="grid size-11 place-items-center border border-white/30">
              <X aria-hidden className="size-5" />
            </button>
          </div>

          <motion.nav
            aria-label="Mobile"
            className="container-page flex-1 py-6"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
          >
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {mainNav.map((item) => (
                <motion.li key={item.label} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn("flex min-h-14 items-center justify-between py-3 font-display text-[1.65rem] leading-tight", pathname === item.href ? "text-flame-300" : "text-white")}
                  >
                    {item.label}
                    <ArrowRight aria-hidden className="size-4 text-flame-400" />
                  </Link>
                  {item.children && (
                    <ul className="-mt-1 flex flex-wrap gap-x-5 gap-y-1 pb-4">
                      {item.children.slice(1).map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} onClick={onClose} className="inline-flex min-h-11 items-center text-sm font-semibold text-white/70">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ul>
            <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }} className="mt-8 grid gap-3">
              <Link href="/contact" onClick={onClose} className="flex min-h-14 items-center justify-center rounded-xl bg-sunset px-6 text-sm font-bold uppercase tracking-[0.16em] text-on-flame">
                Connect
              </Link>
            </motion.div>
          </motion.nav>
          <p className="container-page pb-8 text-xs uppercase tracking-[0.24em] text-white/45">{site.tagline}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
