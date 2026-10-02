import { Star } from "lucide-react";

import { formatPrice, pluralize } from "@/lib/format";

interface PriceSummaryProps {
  pricePerNight: number;
  nights: number;
  total: number;
  currency: string;
  rating: number;
  reviewCount: number;
}

/** "₹28,500 for 5 nights · ★ 4.95 · 19 reviews" header; falls back to the nightly price. */
export function PriceSummary({
  pricePerNight,
  nights,
  total,
  currency,
  rating,
  reviewCount,
}: PriceSummaryProps) {
  return (
    <div className="mb-5 flex items-end justify-between gap-2">
      <p>
        <span className="text-xl font-bold">
          {formatPrice(nights > 0 ? total : pricePerNight, currency)}
        </span>{" "}
        <span className="text-sm">
          {nights > 0 ? `for ${pluralize(nights, "night")}` : "night"}
        </span>
      </p>
      <p className="flex items-center gap-1 text-xs">
        <Star aria-hidden="true" className="size-3 fill-current" />
        {rating}
        <span aria-hidden="true">·</span>
        <span className="underline">{reviewCount} reviews</span>
      </p>
    </div>
  );
}
