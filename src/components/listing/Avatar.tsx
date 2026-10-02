import { cn } from "@/lib/utils";

const TONES = ["bg-neutral-800", "bg-rose-700", "bg-emerald-700", "bg-sky-700", "bg-amber-700"];

/** Initial-letter avatar; the colour is picked from the name so it stays stable between renders. */
export function Avatar({ name, className }: { name: string; className?: string }) {
  const tone = TONES[[...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % TONES.length];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-12 shrink-0 place-items-center rounded-full font-semibold text-white",
        tone,
        className,
      )}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
