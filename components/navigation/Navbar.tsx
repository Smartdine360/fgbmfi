"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { mainNav, type NavItem } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

const isActive = (pathname: string, item: NavItem) =>
  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href) || !!item.children?.some((c) => pathname.startsWith(c.href));

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-flame-400 focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-on-flame">
        Skip to content
      </a>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 top-0 z-50"
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6 lg:h-24">
          <Logo light />

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) =>
                item.children ? (
                  <Dropdown key={item.label} item={item} active={isActive(pathname, item)} />
                ) : (
                  <li key={item.label}>
                    <NavLink href={item.href} active={isActive(pathname, item)}>
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden min-h-11 items-center rounded-xl bg-sunset px-6 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-on-flame shadow-[0_10px_30px_-10px_color-mix(in_srgb,var(--color-flame-500)_70%,transparent)] transition-[filter,transform] duration-300 hover:-translate-y-0.5 hover:brightness-110 sm:inline-flex"
            >
              Connect
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full border border-white/30 text-white transition-colors xl:hidden"
            >
              <Menu aria-hidden className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>
      <MobileNav open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="group relative flex min-h-11 items-center whitespace-nowrap px-2.5 text-[0.82rem] 2xl:px-3.5 font-semibold tracking-wide text-white/85 transition-colors duration-300 hover:text-white"
    >
      {children}
      <span aria-hidden className={cn("absolute inset-x-2.5 bottom-1.5 2xl:inset-x-3.5 h-px origin-left bg-flame-400 transition-transform duration-500 ease-premium group-hover:scale-x-100", active ? "scale-x-100" : "scale-x-0")} />
    </Link>
  );
}

function Dropdown({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => !ref.current?.contains(e.relatedTarget as Node) && setOpen(false)}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="group relative flex min-h-11 items-center gap-1.5 px-2.5 text-[0.82rem] 2xl:px-3.5 font-semibold tracking-wide text-white/85 transition-colors duration-300 hover:text-white"
      >
        {item.label}
        <ChevronDown aria-hidden className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} />
        <span aria-hidden className={cn("absolute inset-x-2.5 bottom-1.5 2xl:inset-x-3.5 h-px origin-left bg-flame-400 transition-transform duration-500 ease-premium", active || open ? "scale-x-100" : "scale-x-0")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full w-64 pt-2"
          >
            <ul className="rounded-2xl border border-white/15 bg-navy-950/85 p-1.5 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl">
              {item.children!.map((child) => (
                <li key={child.href}>
                  <Link href={child.href} onClick={() => setOpen(false)} className="group/item flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 transition-colors hover:bg-white/10">
                    <span>
                      <span className="block text-sm font-semibold text-white">{child.label}</span>
                      <span className="mt-0.5 block text-xs text-white/55">{child.note}</span>
                    </span>
                    <ArrowRight aria-hidden className="size-4 shrink-0 -translate-x-1 text-flame-300 opacity-0 transition-[opacity,transform] duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
