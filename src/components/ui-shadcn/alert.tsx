import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default:
          "border-gray-200 bg-white text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90",
        success:
          "border-success-500 bg-success-50 text-gray-800 dark:border-success-500/30 dark:bg-success-500/15 dark:text-white/90 [&>svg]:text-success-500",
        destructive:
          "border-error-500 bg-error-50 text-gray-800 dark:border-error-500/30 dark:bg-error-500/15 dark:text-white/90 [&>svg]:text-error-500",
        warning:
          "border-warning-500 bg-warning-50 text-gray-800 dark:border-warning-500/30 dark:bg-warning-500/15 dark:text-white/90 [&>svg]:text-warning-500",
        info: "border-blue-light-500 bg-blue-light-50 text-gray-800 dark:border-blue-light-500/30 dark:bg-blue-light-500/15 dark:text-white/90 [&>svg]:text-blue-light-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "mb-1 text-sm font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-gray-500 dark:text-gray-400 [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
