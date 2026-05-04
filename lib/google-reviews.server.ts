import { unstable_cache } from "next/cache";
import { siteConfig } from "@/lib/site";

export type GooglePlaceReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  /** Present when returned by Place Details — reviewer avatar. */
  profile_photo_url?: string;
};

export type GoogleReviewsPayload = {
  rating: number;
  user_ratings_total: number;
  reviews: GooglePlaceReview[];
};

async function resolvePlaceIdFromNearby(apiKey: string): Promise<string | null> {
  const { lat, lng } = siteConfig.businessMapCoords;
  const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
  url.searchParams.set("location", `${lat},${lng}`);
  url.searchParams.set("radius", "120");
  url.searchParams.set("keyword", "Flags Nepal");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());
  const data = (await res.json()) as {
    status: string;
    results?: Array<{ place_id?: string; name?: string }>;
  };

  if (data.status !== "OK" || !data.results?.length) {
    return null;
  }

  const named =
    data.results.find((p) => /flags\s*nepal/i.test(p.name ?? "")) ?? data.results[0];
  return named.place_id ?? null;
}

async function fetchGoogleReviewsUncached(): Promise<GoogleReviewsPayload | null> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }

  let placeId: string | undefined = process.env.GOOGLE_PLACE_ID?.trim() || undefined;
  if (!placeId) {
    const resolved = await resolvePlaceIdFromNearby(apiKey);
    if (!resolved) {
      return null;
    }
    placeId = resolved;
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "rating,user_ratings_total,reviews");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());
  const data = (await res.json()) as {
    status: string;
    result?: {
      rating?: number;
      user_ratings_total?: number;
      reviews?: GooglePlaceReview[];
    };
  };

  if (data.status !== "OK" || !data.result) {
    return null;
  }

  const { rating = 0, user_ratings_total = 0, reviews = [] } = data.result;
  const withText = reviews.filter((r) => r.text?.trim());

  return {
    rating,
    user_ratings_total,
    reviews: withText,
  };
}

/**
 * Cached Google Business reviews (Places API — Place Details).
 * Set `GOOGLE_MAPS_API_KEY` and optionally `GOOGLE_PLACE_ID` (recommended) in server env.
 * Revalidates every 12 hours.
 */
export const getGoogleReviewsPayload = unstable_cache(
  fetchGoogleReviewsUncached,
  ["google-reviews", process.env.GOOGLE_PLACE_ID ?? "nearby"],
  { revalidate: 43_200 },
);
