import { cn } from "@/lib/utils";

/** CSS-only infinite marquee (pauses on hover, static for reduced motion via global rule). */
export function Marquee({
  items,
  className,
  duration = 40,
}: {
  items: React.ReactNode[];
  className?: string;
  duration?: number;
}) {
  const row = items.map((it, i) => (
    <li key={i} className="flex shrink-0 items-center px-8 sm:px-12">
      {it}
    </li>
  ));
  return (
    <div
      className={cn("marquee relative overflow-hidden", className)}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <ul className="marquee-track flex w-max">
        {row}
        {row.map((r, i) => (
          <li key={`d${i}`} aria-hidden className="flex shrink-0 items-center px-8 sm:px-12">
            {items[i]}
          </li>
        ))}
      </ul>
    </div>
  );
}
