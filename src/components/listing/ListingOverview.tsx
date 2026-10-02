import { Medal, Star } from "lucide-react";

import type { Listing } from "@/types/listing";

import { RatingBadge } from "./RatingBadge";
import { Section } from "./Section";

type ListingOverviewProps = Pick<
  Listing,
  "subtitle" | "stats" | "rating" | "reviewCount" | "isGuestFavourite"
> & { isSuperhost: boolean };

export function ListingOverview({
  subtitle,
  stats,
  rating,
  reviewCount,
  isGuestFavourite,
  isSuperhost,
}: ListingOverviewProps) {
  return (
    <Section className="pt-6 lg:pt-0">
      <h2 className="text-[23px] font-semibold leading-7">{subtitle}</h2>
      <p className="mt-1">{stats.join(" · ")}</p>
      {isGuestFavourite ? (
        <RatingBadge rating={rating} reviewCount={reviewCount} />
      ) : (
        <p className="mt-2 flex flex-wrap items-center gap-x-1 text-sm">
          <Star aria-hidden="true" className="size-3 fill-current" />
          <span>
            {rating}
            <span className="sr-only"> out of 5</span>
          </span>
          <span aria-hidden="true">·</span>
          <a href="#reviews" className="underline">
            {reviewCount} reviews
          </a>
          {isSuperhost && (
            <>
              <span aria-hidden="true">·</span>
              <Medal aria-hidden="true" className="size-3.5 text-primary" />
              <span>Superhost</span>
            </>
          )}
        </p>
      )}
    </Section>
  );
}
