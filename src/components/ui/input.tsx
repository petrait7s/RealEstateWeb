import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "border-border bg-surface placeholder:text-muted focus:border-accent h-12 w-full rounded-md border px-4 text-sm transition-colors focus:outline-none",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
