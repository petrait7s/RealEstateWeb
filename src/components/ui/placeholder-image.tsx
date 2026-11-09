import { cn } from "@/lib/utils";

/** Generated architectural placeholder; swap for next/image once media is uploaded. */
export function PlaceholderImage({
  hue = 38,
  seed = 1,
  className,
  label,
}: {
  hue?: number;
  seed?: number;
  className?: string;
  label?: string;
}) {
  const bars = Array.from({ length: 9 }, (_, i) => {
    const h = 25 + ((i * 37 + seed * 53) % 55);
    return { x: 4 + i * 11, h };
  });
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{ background: `linear-gradient(160deg, hsl(${hue} 35% 28%), hsl(${hue} 30% 10%))` }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(80% 60% at 75% 15%, hsl(${hue} 70% 62% / .45), transparent 65%)`,
        }}
      />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 size-full"
      >
        {bars.map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y={100 - b.h}
              width={9}
              height={b.h}
              fill={`hsl(${hue} 30% ${8 + (i % 3) * 3}%)`}
              opacity={0.85}
            />
            {Array.from({ length: Math.floor(b.h / 8) }, (_, r) => (
              <rect
                key={r}
                x={b.x + 1.5}
                y={100 - b.h + 3 + r * 8}
                width={6}
                height={2.2}
                fill={`hsl(${hue} 80% 70%)`}
                opacity={(i + r + seed) % 3 === 0 ? 0.8 : 0.15}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
