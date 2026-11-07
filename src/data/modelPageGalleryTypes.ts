export type ModelPageSlug = "vf6" | "vf7" | "mpv7" | "limo-green";

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

export type ModelPageHeroFit = "cover" | "contain";

export type ModelPageHeroConfig = {
  imageUrl: string;
  width: number;
  height: number;
  alt: string;
  imageFit: ModelPageHeroFit;
  /** When true, same banner image is added to the homepage hero carousel. */
  showcaseOnHomepage?: boolean;
  homepageHeroOrder?: number;
  homepageHeroTitle?: string;
  homepageHeroSubtitle?: string;
  homepageHeroBadge?: string;
  homepageObjectPosition?: string;
};

export type ModelPageColorShade = {
  id?: string;
  name: string;
  hex: string;
  imageUrl: string;
  alt: string;
  order: number;
  active: boolean;
};

export type ModelPageGalleryContent = {
  slug: ModelPageSlug;
  galleryLabel: string;
  galleryTitle: string;
  galleryIntro: string;
  features: ModelPageFeatureItem[];
  hero?: ModelPageHeroConfig;
  colorStudioIntro?: string;
  colorShades?: ModelPageColorShade[];
};

/** Full CMS payload for a model page (hero + gallery). */
export type ModelPageContent = ModelPageGalleryContent & {
  hero: ModelPageHeroConfig;
  colorStudioIntro: string;
  colorShades: ModelPageColorShade[];
};

export const MODEL_PAGE_SLUGS: ModelPageSlug[] = ["vf6", "vf7", "mpv7", "limo-green"];

export const MODEL_PAGE_LABELS: Record<ModelPageSlug, string> = {
  vf6: "VF 6",
  vf7: "VF 7",
  mpv7: "VF MPV 7",
  "limo-green": "Limo Green",
};
