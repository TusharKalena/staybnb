import { Star } from "lucide-react";

import { Laurel } from "./Laurel";

interface RatingBadgeProps {
  rating: number;
  reviewCount: number;
}

/** Full-width "Guest favourite" bar: laurels, tagline, rating with stars, review count. */
export function RatingBadge({ rating, reviewCount }: RatingBadgeProps) {
  return (
    <div className="mt-6 flex items-center gap-4 rounded-xl border border-border px-4 py-3 sm:px-6">
      <p className="flex shrink-0 items-center text-center text-sm font-semibold leading-4">
        <Laurel className="h-9 w-4" />
        <span className="px-1">
          Guest
          <br />
          favourite
        </span>
        <Laurel flip className="h-9 w-4" />
      </p>
      <p className="hidden flex-1 text-sm sm:block">
        One of the most loved homes on Airbnb, according to guests
      </p>
      <div className="ml-auto flex items-center divide-x divide-border text-center">
        <p className="pr-4">
          <span className="block text-lg font-semibold leading-5">
            {rating}
            <span className="sr-only"> out of 5</span>
          </span>
          <span aria-hidden="true" className="flex">
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} className="size-2.5 fill-current" />
            ))}
          </span>
        </p>
        <a href="#reviews" className="pl-4">
          <span className="block text-lg font-semibold leading-5">{reviewCount}</span>
          <span className="text-xs underline">Reviews</span>
        </a>
      </div>
    </div>
  );
}
