import type { Metadata } from "next";

import { ListingPage } from "@/components/pages/ListingPage";
import { listing } from "@/data/listing";

export const metadata: Metadata = {
  title: `${listing.title} - Airbnb`,
  description: listing.subtitle,
  openGraph: { title: listing.title, description: listing.subtitle },
};

export default function Home() {
  return <ListingPage />;
}
