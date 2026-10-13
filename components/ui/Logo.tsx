import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** The official FGBMFI emblem (/public/images/logo.webp) beside the Singapore wordmark. */
export function Logo({ light, className, onClick }: { light?: boolean; className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label="FGBMFI Singapore — home" className={cn("group flex items-center gap-3", className)}>
      <Image src="/images/logo.webp" alt="" width={640} height={598} sizes="56px" priority className="h-12 w-auto shrink-0 lg:h-[3.25rem]" />
      <span className="flex flex-col leading-none">
        <span className="overflow-hidden pb-0.5">
          <span className={cn("logo-word block font-display text-xl font-semibold tracking-[0.08em]", light ? "[--logo-ink:#fff]" : "[--logo-ink:var(--color-navy-900)]")}>FGBMFI</span>
        </span>
        <span className={cn("logo-sub mt-0.5 text-[0.6rem] font-bold uppercase tracking-[0.34em] transition-colors duration-500", light ? "text-flame-300" : "text-flame-700")}>Singapore</span>
      </span>
    </Link>
  );
}
