"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Moves its children slightly slower than the page scroll. Place inside a
 * `relative overflow-hidden` parent; the layer is oversized so no edge shows.
 */
export function Parallax({ children, className, amount = 8 }: { children: React.ReactNode; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[12%] will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
