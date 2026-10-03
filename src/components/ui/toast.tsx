"use client";

import { cn } from "@/lib/utils";

/** How long the toast stays on screen before the caller clears its message. */
export const TOAST_VISIBLE_MS = 2500;

interface ToastProps {
  /** Text to announce, or null when no toast should be shown. */
  message: string | null;
}

/**
 * Dark notification anchored above the mobile booking bar. Fixed positioning keeps it
 * out of the document flow, so it never occupies layout space.
 */
export function Toast({ message }: ToastProps) {
  if (message === null) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed left-1/2 z-[60] w-max max-w-[calc(100vw-2rem)] -translate-x-1/2",
        "rounded-xl bg-neutral-800 px-5 py-4 text-center text-sm font-semibold text-white shadow-lg",
        "bottom-[94px] lg:bottom-10",
        "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-300 fill-mode-forwards",
      )}
    >
      {message}
    </div>
  );
}