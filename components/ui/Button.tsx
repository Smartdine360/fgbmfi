import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "navy" | "outline-light" | "outline-dark";

const variants: Record<Variant, string> = {
  primary: "bg-sunset text-on-flame shadow-[0_14px_34px_-12px_color-mix(in_srgb,var(--color-flame-500)_75%,transparent)] hover:brightness-110",
  navy: "bg-navy-900 text-white shadow-[0_14px_34px_-14px_rgba(20,11,51,0.6)] hover:bg-navy-700",
  "outline-light": "border border-white/40 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-navy-950",
  "outline-dark": "border border-navy-900/25 text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white",
};

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  /** Stretch to the full width of the container on small screens. */
  fullOnMobile?: boolean;
};

/** Primary call-to-action. Renders a link; the arrow nudges forward on hover. */
export function Button({ href, children, variant = "primary", className, external, fullOnMobile }: ButtonProps) {
  const classes = cn(
    "group inline-flex min-h-13 items-center justify-center gap-3 rounded-xl py-2 pl-6 pr-2 text-[0.8rem] font-bold uppercase tracking-[0.12em] transition-[background-color,border-color,color,transform,filter] duration-300 ease-premium hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    fullOnMobile && "w-full sm:w-auto",
    variants[variant],
    className,
  );
  const Icon = external ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-lg bg-current/15">
        <Icon className="size-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5" />
      </span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

/** Quiet text link with an underline that draws in on hover. */
export function TextLink({ href, children, light, className }: { href: string; children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[0.16em]",
        light ? "text-flame-300" : "text-navy-900",
        className,
      )}
    >
      <span className="relative pb-1">
        {children}
        <span className={cn("absolute inset-x-0 bottom-0 h-px origin-left scale-x-100 transition-transform duration-500 ease-premium group-hover:scale-x-0 group-hover:origin-right", light ? "bg-flame-300/60" : "bg-navy-900/40")} />
      </span>
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
    </Link>
  );
}
