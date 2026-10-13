import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        {all.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {i > 0 && <ChevronRight aria-hidden className="size-3 text-flame-400" />}
            {c.href ? (
              <Link href={c.href} className="py-2 transition-colors hover:text-white">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="py-2 text-flame-300">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
