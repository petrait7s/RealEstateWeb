"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleToggle } from "./LocaleToggle";

const links = [
  { href: "/", key: "home" },
  { href: "/projects", key: "projects" },
  { href: "/about", key: "about" },
  { href: "/gallery", key: "gallery" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar({ brand }: { brand: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-premium)]",
        scrolled ? "glass py-3" : "py-5",
        pathname === "/" && !scrolled && "text-[#f3eee3]",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-8"
      >
        <Link href="/" className="font-display text-xl tracking-tight sm:text-2xl">
          {brand}
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.key}>
              <Link
                href={l.href}
                className={cn(
                  "hover:text-accent text-sm tracking-wide transition-colors",
                  pathname === l.href ? "text-accent" : "opacity-80",
                )}
              >
                {t(l.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LocaleToggle />
          <ThemeToggle />
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "md" }), "hidden md:inline-flex")}
          >
            {t("bookVisit")}
          </Link>
          <button
            type="button"
            className="border-border inline-flex size-10 items-center justify-center rounded-full border lg:hidden"
            aria-label={open ? t("close") : t("menu")}
            aria-expanded={open}
            onClick={() => setOpenAt(open ? null : pathname)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="glass absolute inset-x-0 top-full h-[calc(100dvh-100%)] min-h-[70dvh] px-6 pt-8 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={l.href}
                    className="font-display border-border block border-b py-4 text-3xl"
                  >
                    {t(l.key)}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "mt-8 w-full")}>
              {t("bookVisit")}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
