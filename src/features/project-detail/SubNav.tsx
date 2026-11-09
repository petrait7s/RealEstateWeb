"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Sticky sub-nav with scroll-spy. */
export function SubNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav aria-label="Project sections" className="glass sticky top-[68px] z-30 border-x-0">
      <ul
        className="mx-auto flex max-w-[1600px] gap-1 overflow-x-auto px-4 py-2 sm:px-8"
        data-lenis-prevent-wheel
      >
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "true" : undefined}
              className={cn(
                "block rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors",
                active === i.id
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground",
              )}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
