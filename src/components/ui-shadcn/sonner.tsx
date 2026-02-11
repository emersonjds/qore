"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-800 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-theme-lg dark:group-[.toaster]:bg-gray-900 dark:group-[.toaster]:text-white/90 dark:group-[.toaster]:border-gray-800",
          description:
            "group-[.toast]:text-gray-500 dark:group-[.toast]:text-gray-400",
          actionButton:
            "group-[.toast]:bg-brand-500 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500 dark:group-[.toast]:bg-gray-800",
          success:
            "group-[.toaster]:border-success-500 group-[.toaster]:bg-success-50 dark:group-[.toaster]:bg-success-500/15",
          error:
            "group-[.toaster]:border-error-500 group-[.toaster]:bg-error-50 dark:group-[.toaster]:bg-error-500/15",
          warning:
            "group-[.toaster]:border-warning-500 group-[.toaster]:bg-warning-50 dark:group-[.toaster]:bg-warning-500/15",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
