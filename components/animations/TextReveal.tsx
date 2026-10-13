"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  delay?: number;
  /** Animate on mount (heroes) rather than when scrolled into view. */
  immediate?: boolean;
  /** Class applied to the final word, e.g. to pick it out in the accent colour. */
  accentClassName?: string;
};

/** Reveals a line of text word by word from behind a mask. */
export function TextReveal({ text, as = "h2", className, delay = 0, immediate = false, accentClassName }: Props) {
  const Tag = motion[as];
  const words = text.split(" ");
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <Tag className={className} aria-label={text} initial="hidden" {...trigger} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={cn("inline-block will-change-transform", i === words.length - 1 && accentClassName)}
            variants={{ hidden: { y: "110%", opacity: 0 }, show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
