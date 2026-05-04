export type ManualGoogleReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  profile_photo_url?: string;
};

/**
 * Manually curated Google reviews.
 *
 * These are real reviews pasted from the Flags Nepal Google Business profile.
 * They render in the homepage Testimonials section with a "Google" badge.
 */
export const manualGoogleReviews: ManualGoogleReview[] = [
  {
    author_name: "Bijaya Rana",
    rating: 5,
    text: "It was as expected and high quality.",
    relative_time_description: "17 weeks ago",
  },
  {
    author_name: "Pradip Diwali",
    rating: 5,
    text: "Quality was really good.",
    relative_time_description: "Sindhuli Biker Riders Club · 18 weeks ago",
  },
  {
    author_name: "Sudin Shrestha",
    rating: 5,
    text: "It was perfect.",
    relative_time_description: "Global Student Group · 27 weeks ago",
  },
  {
    author_name: "Bibek Rana Magar",
    rating: 4,
    text:
      "One of the most finest and best flag related place. I'm glad I chose Flags Nepal. You can design and edit whatever your choice is — they will provide it with best quality. \u270C\uFE0F",
    relative_time_description: "National Cricket Player, Nepal · July 2024",
  },
  {
    author_name: "Prabhat Hangkim",
    rating: 5,
    text: "Great job!! Totally satisfied with their service. \uD83D\uDE4C\uD83D\uDC4D",
    relative_time_description: "National Cricket Player, Nepal · July 2024",
  },
];
