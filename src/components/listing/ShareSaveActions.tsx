"use client";

import { Heart, Share } from "lucide-react";

import { useShare } from "@/hooks/use-share";
import { cn } from "@/lib/utils";

interface ShareSaveActionsProps {
  saved: boolean;
  onToggleSave: () => void;
}

const actionClass =
  "flex cursor-pointer items-center gap-2 text-sm font-semibold transition-colors duration-200 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-foreground";

export function ShareSaveActions({ saved, onToggleSave }: ShareSaveActionsProps) {
  const { share, copied } = useShare();

  return (
    <div className="flex shrink-0 items-center gap-4 sm:gap-6">
      <button
        type="button"
        onClick={share}
        aria-label={copied ? "Link copied" : "Share"}
        className={actionClass}
      >
        <Share aria-hidden="true" className="size-[18px]" />
        <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
      </button>
      <button
        type="button"
        onClick={onToggleSave}
        aria-pressed={saved}
        aria-label="Save to wishlist"
        className={actionClass}
      >
        <Heart
          aria-hidden="true"
          className={cn("size-[18px] transition-colors", saved && "fill-primary text-primary")}
        />
        <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}