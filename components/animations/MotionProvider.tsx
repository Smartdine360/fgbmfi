"use client";

import { MotionConfig } from "motion/react";

/** Honours the visitor's reduced-motion setting for every animation on the site. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </MotionConfig>
  );
}
