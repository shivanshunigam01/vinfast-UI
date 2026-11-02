export type ModelPageSlug = "vf6" | "vf7" | "mpv7";

export type ModelPageFeatureLayout = "wide" | "standard";

export type ModelPageFeatureItem = {
  id?: string;
  imageUrl: string;
  title: string;
  description: string;
  alt: string;
  layout: ModelPageFeatureLayout;
  order: number;
  active: boolean;
};

export type ModelPageGalleryContent = {
  slug: ModelPageSlug;
  galleryLabel: string;
  galleryTitle: string;
  galleryIntro: string;
  features: ModelPageFeatureItem[];
};

export const MODEL_PAGE_SLUGS: ModelPageSlug[] = ["vf6", "vf7", "mpv7"];

export const MODEL_PAGE_LABELS: Record<ModelPageSlug, string> = {
  vf6: "VF 6",
  vf7: "VF 7",
  mpv7: "VF MPV 7",
};
