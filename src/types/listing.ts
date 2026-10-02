import type { LucideIcon } from "lucide-react";

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Highlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Amenity {
  icon: LucideIcon;
  label: string;
  /** Shown struck through, like "Carbon monoxide alarm" when the host has not reported one. */
  unavailable?: boolean;
}

export interface SleepingArea {
  name: string;
  beds: string;
  photo: Photo;
}

export interface Host {
  name: string;
  avatar: string;
  yearsHosting: number;
  isSuperhost: boolean;
}

export interface HostProfile {
  reviewCount: number;
  rating: number;
  facts: { icon: LucideIcon; text: string }[];
  coHosts: string[];
  responseRate: string;
  responseTime: string;
}

export interface RatingCategory {
  icon: LucideIcon;
  label: string;
  score: number;
}

export interface ReviewTopic {
  icon: LucideIcon;
  label: string;
  count: number;
}

export interface Review {
  name: string;
  memberFor: string;
  date: string;
  text: string;
}

export interface Policy {
  icon: LucideIcon;
  title: string;
  lines: string[];
}

export interface NearbyStay {
  title: string;
  photo: string;
  price: number;
  rating: number;
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  highlights: string[];
}

export interface Listing {
  title: string;
  subtitle: string;
  stats: string[];
  pricePerNight: number;
  currency: string;
  rating: number;
  reviewCount: number;
  isGuestFavourite: boolean;
  maxGuests: number;
  host: Host;
  photos: Photo[];
  highlights: Highlight[];
  sleepingAreas: SleepingArea[];
  description: string[];
  amenities: Amenity[];
  /** How many amenities are shown before "Show all". */
  featuredAmenityCount: number;
  /** Total shown on the "Show all" button; the real listing has more than we model. */
  amenityTotal: number;
  /** Count of reviews for each star value, from 5 down to 1. */
  ratingDistribution: number[];
  ratingCategories: RatingCategory[];
  reviewTopics: ReviewTopic[];
  reviews: Review[];
  location: Location;
  hostProfile: HostProfile;
  policies: Policy[];
  nearbyStays: NearbyStay[];
}
