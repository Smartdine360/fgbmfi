"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import type { GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const ratios = { portrait: "aspect-[4/5]", landscape: "aspect-[3/2]", square: "aspect-square" };

/** Masonry gallery with category filters and a keyboard- and swipe-friendly lightbox. */
export function GalleryGrid({ items, filterable = true }: { items: GalleryItem[]; filterable?: boolean }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<number | null>(null);
  const visible = useMemo(() => (category === "All" ? items : items.filter((i) => i.category === category)), [items, category]);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setActive(null);
    opener.current?.focus();
  }, []);
  const step = useCallback((d: number) => setActive((i) => (i === null ? i : (i + d + visible.length) % visible.length)), [visible.length]);

  const isOpen = active !== null;
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab") {
        // Keep focus inside the lightbox.
        const nodes = document.querySelectorAll<HTMLElement>("#lightbox button");
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, step]);

  const current = active !== null ? visible[active] : null;

  return (
    <>
      {filterable && (
        <div className="-mx-5 mb-10 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap" aria-label="Filter photographs">
            {categories.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  aria-pressed={c === category}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "min-h-11 whitespace-nowrap border px-5 text-[0.72rem] font-bold uppercase tracking-[0.16em] transition-colors duration-300",
                    c === category ? "border-navy-900 bg-navy-900 text-white" : "border-navy-900/20 text-navy-900 hover:border-navy-900",
                  )}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item, i) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-4 break-inside-avoid lg:mb-6"
            >
              <button
                type="button"
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setActive(i);
                }}
                aria-label={`Open photograph: ${item.caption || item.image.alt}`}
                className={cn("group relative block w-full overflow-hidden bg-navy-900", ratios[item.ratio])}
              >
                <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.05]" />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-left">
                  <span>
                    <span className="eyebrow block text-flame-300">{item.category}</span>
                    {item.caption && <span className="mt-1 block font-display text-lg leading-snug text-white">{item.caption}</span>}
                  </span>
                  <Expand aria-hidden className="size-5 shrink-0 text-white/80 transition-transform duration-500 ease-premium group-hover:scale-110" />
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <AnimatePresence>
        {current && active !== null && (
          <motion.div
            id="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Photograph ${active + 1} of ${visible.length}: ${current.caption || current.image.alt}`}
            className="fixed inset-0 z-[70] flex flex-col bg-navy-950/97 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <div className="flex items-center justify-between p-4 text-white sm:p-6">
              <p className="font-display text-lg" aria-hidden>
                {String(active + 1).padStart(2, "0")} <span className="text-white/50">/ {String(visible.length).padStart(2, "0")}</span>
              </p>
              <button ref={closeBtn} type="button" onClick={close} aria-label="Close photograph" className="grid size-12 place-items-center border border-white/30 hover:bg-white hover:text-navy-950">
                <X aria-hidden className="size-5" />
              </button>
            </div>

            <div className="relative flex-1 px-4 sm:px-20" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  className="absolute inset-0 mx-4 cursor-grab touch-pan-y active:cursor-grabbing sm:mx-20"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -70) step(1);
                    else if (info.offset.x > 70) step(-1);
                  }}
                >
                  <Image src={current.image.src} alt={current.image.alt} fill sizes="100vw" className="pointer-events-none object-contain" />
                </motion.div>
              </AnimatePresence>
              {[
                { d: -1, label: "Previous photograph", Icon: ArrowLeft, pos: "left-2 sm:left-5" },
                { d: 1, label: "Next photograph", Icon: ArrowRight, pos: "right-2 sm:right-5" },
              ].map(({ d, label, Icon, pos }) => (
                <button key={label} type="button" aria-label={label} onClick={() => step(d)} className={cn("absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center border border-white/30 bg-navy-950/60 text-white hover:bg-white hover:text-navy-950", pos)}>
                  <Icon aria-hidden className="size-5" />
                </button>
              ))}
            </div>

            <div className="p-5 text-center sm:p-7" onClick={(e) => e.stopPropagation()}>
              <p className="eyebrow text-flame-300">{current.category}</p>
              {current.caption && <p className="mt-1.5 font-display text-xl text-white">{current.caption}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
