import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wider uppercase",
  {
    variants: {
      variant: {
        default: "border-border text-muted",
        accent: "border-accent/40 text-accent",
        available: "border-[var(--status-available)]/40 text-[var(--status-available)]",
        booked: "border-[var(--status-booked)]/40 text-[var(--status-booked)]",
        sold: "border-[var(--status-sold)]/40 text-[var(--status-sold)]",
        hold: "border-[var(--status-hold)]/40 text-[var(--status-hold)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
