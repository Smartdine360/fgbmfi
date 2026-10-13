"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type Props = { value: number; prefix?: string; suffix?: string; /** Show as a year (no thousands separator). */ plain?: boolean; className?: string };

/** Counts up to `value` the first time it scrolls into view. */
export function Counter({ value, prefix = "", suffix = "", plain = false, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const format = (n: number) => `${prefix}${plain ? Math.round(n) : Math.round(n).toLocaleString("en-SG")}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduce) {
      node.textContent = format(value);
      return;
    }
    // Years start close to their final value so the count does not race through centuries.
    const controls = animate(plain ? value - 60 : 0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => (node.textContent = format(n)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  // The final value is rendered on the server so it is correct without JavaScript.
  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
