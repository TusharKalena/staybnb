import { ChevronDown, Minus, Plus } from "lucide-react";
import { useId, useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { pluralize } from "@/lib/format";
import { cn } from "@/lib/utils";

interface GuestSelectorProps {
  guests: number;
  maxGuests: number;
  onGuestsChange: (guests: number) => void;
}

interface StepperButtonProps {
  label: string;
  atLimit: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

/** Stays focusable at its limit (aria-disabled) so keyboard focus is never lost. */
function StepperButton({ label, atLimit, onClick, children }: StepperButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-disabled={atLimit}
      onClick={() => !atLimit && onClick()}
      className="grid size-8 cursor-pointer place-items-center rounded-full border border-input transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground aria-disabled:cursor-not-allowed aria-disabled:opacity-30 aria-disabled:hover:border-input"
    >
      {children}
    </button>
  );
}

export function GuestSelector({ guests, maxGuests, onGuestsChange }: GuestSelectorProps) {
  const [open, setOpen] = useState(false);
  const labelId = useId();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex w-full cursor-pointer items-center justify-between rounded-b-lg border-t border-input p-3 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground">
        <span>
          <span className="block text-[10px] font-bold uppercase">Guests</span>
          <span className="text-xs">{pluralize(guests, "guest")}</span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        aria-label="Guests"
        className="w-[var(--radix-popover-trigger-width)] min-w-[260px] rounded-lg p-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <p id={labelId} className="font-semibold">
              Guests
            </p>
            <p className="text-sm text-muted-foreground">Ages 13 or above</p>
          </div>
          <div className="flex items-center gap-3" role="group" aria-labelledby={labelId}>
            <StepperButton
              label="Decrease guests"
              atLimit={guests <= 1}
              onClick={() => onGuestsChange(guests - 1)}
            >
              <Minus aria-hidden="true" className="size-3.5" />
            </StepperButton>
            <span aria-live="polite" className="w-5 text-center">
              {guests}
            </span>
            <StepperButton
              label="Increase guests"
              atLimit={guests >= maxGuests}
              onClick={() => onGuestsChange(guests + 1)}
            >
              <Plus aria-hidden="true" className="size-3.5" />
            </StepperButton>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          This place has a maximum of {maxGuests} guests.
        </p>
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold underline hover:bg-muted"
          >
            Close
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
