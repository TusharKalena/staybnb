import { cn } from "@/lib/utils";

/** Hand-drawn laurel branch used around the "Guest favourite" rating. Mirror it for the right side. */
export function Laurel({ flip = false, className }: { flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 64"
      aria-hidden="true"
      className={cn("h-16 w-8 fill-current", flip && "-scale-x-100", className)}
    >
      <path d="M22 62c-9-6-14-16-14-28 0-9 3-18 9-26l1.5 1C13 17 10 25 10 34c0 11 4.5 20 13 26z" />
      <ellipse cx="20" cy="8" rx="3" ry="6" transform="rotate(30 20 8)" />
      <ellipse cx="13" cy="18" rx="3" ry="6.5" transform="rotate(-20 13 18)" />
      <ellipse cx="9" cy="30" rx="3" ry="6.5" transform="rotate(-40 9 30)" />
      <ellipse cx="9" cy="43" rx="3" ry="6.5" transform="rotate(-60 9 43)" />
      <ellipse cx="14" cy="54" rx="3" ry="6.5" transform="rotate(-75 14 54)" />
      <ellipse cx="18" cy="24" rx="2.5" ry="5.5" transform="rotate(25 18 24)" />
      <ellipse cx="16" cy="37" rx="2.5" ry="5.5" transform="rotate(10 16 37)" />
      <ellipse cx="19" cy="49" rx="2.5" ry="5.5" transform="rotate(-10 19 49)" />
    </svg>
  );
}
