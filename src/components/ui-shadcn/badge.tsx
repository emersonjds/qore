import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400",
        secondary:
          "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80",
        destructive:
          "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500",
        success:
          "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
        warning:
          "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400",
        info: "bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/15 dark:text-blue-light-500",
        outline:
          "border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300",
        solid:
          "bg-brand-500 text-white dark:text-white",
        "solid-success":
          "bg-success-500 text-white dark:text-white",
        "solid-error":
          "bg-error-500 text-white dark:text-white",
        "solid-warning":
          "bg-warning-500 text-white dark:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
