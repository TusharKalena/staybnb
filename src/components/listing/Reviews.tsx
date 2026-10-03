import { Star } from "lucide-react";
import { useState } from "react";

import type { Listing, Review } from "@/types/listing";

import { Avatar } from "./Avatar";
import { Laurel } from "./Laurel";
import { Section } from "./Section";

const PREVIEW_LENGTH = 180;

type ReviewsProps = Pick<
  Listing,
  "rating" | "reviewCount" | "ratingDistribution" | "ratingCategories" | "reviewTopics" | "reviews"
>;

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > PREVIEW_LENGTH;
  const text =
    isLong && !expanded ? `${review.text.slice(0, PREVIEW_LENGTH).trimEnd()}…` : review.text;

  return (
    <article>
      <div className="flex items-center gap-3">
        <Avatar name={review.name} />
        <div>
          <h3 className="font-semibold">{review.name}</h3>
          <p className="text-sm text-muted-foreground">{review.memberFor}</p>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1 text-sm">
        <span className="flex" aria-label="5 stars">
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} aria-hidden="true" className="size-2.5 fill-current" />
          ))}
        </span>
        <span aria-hidden="true">·</span>
        <span className="font-semibold">{review.date}</span>
      </p>
      <p className="mt-2 whitespace-pre-line leading-6">{text}</p>
      {isLong && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
          className="mt-2 cursor-pointer font-semibold underline"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </article>
  );
}

export function Reviews({
  rating,
  reviewCount,
  ratingDistribution,
  ratingCategories,
  reviewTopics,
  reviews,
}: ReviewsProps) {
  const [showAll, setShowAll] = useState(false);
  const maxBucket = Math.max(...ratingDistribution, 1);

  return (
    <Section id="reviews" className="py-12">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <Laurel />
          <p className="text-7xl font-semibold tracking-tight">{rating}</p>
          <Laurel flip />
        </div>
        <h2 className="mt-2 text-xl font-semibold">Guest favourite</h2>
        <p className="mt-1 max-w-xs text-muted-foreground">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button type="button" className="mt-2 cursor-pointer text-sm font-semibold underline">
          How reviews work
        </button>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-7 lg:gap-0 lg:divide-x lg:divide-border">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1 lg:pr-6">
          <h3 className="text-sm font-semibold">Overall rating</h3>
          <ol className="mt-2 space-y-1">
            {ratingDistribution.map((count, index) => (
              <li key={index} className="flex items-center gap-2 text-xs">
                <span className="w-2">{5 - index}</span>
                <span className="h-1 flex-1 rounded-full bg-border">
                  <span
                    className="block h-full rounded-full bg-foreground"
                    style={{ width: `${(count / maxBucket) * 100}%` }}
                  />
                </span>
                <span className="sr-only">{count} reviews</span>
              </li>
            ))}
          </ol>
        </div>
        {ratingCategories.map(({ icon: Icon, label, score }) => (
          <div key={label} className="flex flex-col justify-between gap-6 lg:px-6">
            <div>
              <h3 className="text-sm font-semibold">{label}</h3>
              <p className="text-lg font-semibold">{score.toFixed(1)}</p>
            </div>
            <Icon aria-hidden="true" className="size-8 stroke-[1.25]" />
          </div>
        ))}
      </div>

      <ul className="mt-10 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {reviewTopics.map(({ icon: Icon, label, count }) => (
          <li
            key={label}
            className="flex shrink-0 items-center gap-2 rounded-full border border-input px-4 py-2 text-sm"
          >
            <Icon aria-hidden="true" className="size-5" />
            <span className="font-semibold">{label}</span>
            <span className="text-muted-foreground">{count}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-x-24 gap-y-10 md:grid-cols-2">
        {(showAll ? reviews : reviews.slice(0, 6)).map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setShowAll(true)}
        className="mt-10 h-12 cursor-pointer rounded-lg bg-muted px-6 font-semibold transition-colors hover:bg-border"
      >
        Show all {reviewCount} reviews
      </button>
    </Section>
  );
}

