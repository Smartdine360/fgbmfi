import { cn } from "@/lib/utils";

/** Marks sample or placeholder content so it is never mistaken for real information. */
export function SampleTag({ children = "Sample", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center border border-flame-500/50 bg-ivory/95 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-flame-700", className)}>
      {children}
    </span>
  );
}
