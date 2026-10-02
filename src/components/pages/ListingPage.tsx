"use client";

import { useState } from "react";

import { BookingCard } from "@/components/booking/BookingCard";
import { MobileBookingBar } from "@/components/booking/MobileBookingBar";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { Amenities } from "@/components/listing/Amenities";
import { Description } from "@/components/listing/Description";
import { Highlights } from "@/components/listing/Highlights";
import { HostSummary } from "@/components/listing/HostSummary";
import { LocationMap } from "@/components/listing/LocationMap";
import { MeetHost } from "@/components/listing/MeetHost";
import { NearbyStays } from "@/components/listing/NearbyStays";
import { ListingOverview } from "@/components/listing/ListingOverview";
import { ListingTitle } from "@/components/listing/ListingTitle";
import { PhotoGallery } from "@/components/listing/PhotoGallery";
import { PhotoLightbox } from "@/components/listing/PhotoLightbox";
import { Reviews } from "@/components/listing/Reviews";
import { SectionNav } from "@/components/listing/SectionNav";
import { SleepingArrangements } from "@/components/listing/SleepingArrangements";
import { StayCalendar } from "@/components/listing/StayCalendar";
import { ThingsToKnow } from "@/components/listing/ThingsToKnow";
import { defaultStay, listing } from "@/data/listing";
import { useBooking } from "@/hooks/use-booking";

const MAIN_ID = "main";

export function ListingPage() {
  const [saved, setSaved] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const booking = useBooking({ ...listing, initialRange: defaultStay });
  const toggleSave = () => setSaved((value) => !value);

  return (
    <>
      <SkipLink targetId={MAIN_ID} />
      <Header />
      <SectionNav booking={booking} rating={listing.rating} reviewCount={listing.reviewCount} />

      <Container as="main" id={MAIN_ID} tabIndex={-1} className="pb-28 outline-none lg:pb-16">
        <ListingTitle title={listing.title} saved={saved} onToggleSave={toggleSave} />
        <div id="photos" className="scroll-mt-24">
          <PhotoGallery photos={listing.photos} onOpen={setLightboxIndex} />
        </div>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12 lg:pt-12 xl:gap-20">
          <div className="min-w-0">
            <ListingOverview
              subtitle={listing.subtitle}
              stats={listing.stats}
              rating={listing.rating}
              reviewCount={listing.reviewCount}
              isGuestFavourite={listing.isGuestFavourite}
              isSuperhost={listing.host.isSuperhost}
            />
            <HostSummary host={listing.host} />
            <Highlights items={listing.highlights} />
            <Description paragraphs={listing.description} />
            <SleepingArrangements areas={listing.sleepingAreas} />
            <Amenities
              amenities={listing.amenities}
              featuredCount={listing.featuredAmenityCount}
              total={listing.amenityTotal}
            />
            <StayCalendar booking={booking} place="Candolim" />
          </div>
          <BookingCard
            booking={booking}
            rating={listing.rating}
            reviewCount={listing.reviewCount}
          />
        </div>

        <Reviews
          rating={listing.rating}
          reviewCount={listing.reviewCount}
          ratingDistribution={listing.ratingDistribution}
          ratingCategories={listing.ratingCategories}
          reviewTopics={listing.reviewTopics}
          reviews={listing.reviews}
        />
        <LocationMap location={listing.location} />
        <MeetHost host={listing.host} profile={listing.hostProfile} />
        <ThingsToKnow policies={listing.policies} />
        <NearbyStays stays={listing.nearbyStays} currency={listing.currency} />
      </Container>

      <MobileBookingBar
        booking={booking}
        rating={listing.rating}
        reviewCount={listing.reviewCount}
      />
      <PhotoLightbox
        photos={listing.photos}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
        saved={saved}
        onToggleSave={toggleSave}
      />
    </>
  );
}
