import { Search } from "lucide-react";

/** Display-only search pill, matching the reference (search is out of scope for this page). */
export function SearchBar() {
  return (
    <button
      type="button"
      aria-label="Search (not available in this demo)"
      aria-disabled="true"
      className="mx-auto grid h-12 w-full min-w-0 max-w-[365px] cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center rounded-full border border-border bg-background pl-4 pr-2 shadow-sm transition-shadow duration-200 hover:shadow-md md:grid-cols-[auto_auto_auto_auto] md:pl-5"
    >
      <span className="min-w-0 text-left">
        <span className="block truncate text-sm font-semibold">Anywhere</span>
        <span className="block truncate text-xs text-muted-foreground md:hidden">
          Any week · Add guests
        </span>
      </span>
      <span className="hidden border-l border-border px-4 text-sm font-semibold md:block">
        Anytime
      </span>
      <span className="hidden border-l border-border px-4 text-sm text-muted-foreground md:block">
        Add guests
      </span>
      <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
        <Search aria-hidden="true" size={15} strokeWidth={3} />
      </span>
    </button>
  );
}
