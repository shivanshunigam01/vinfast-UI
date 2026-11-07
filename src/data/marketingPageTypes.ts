export const MARKETING_PAGE_SLUGS = [
  "compare",
  "test-drive",
  "emi-calculator",
  "about",
  "contact",
] as const;

export type MarketingPageSlug = (typeof MARKETING_PAGE_SLUGS)[number];

export const MARKETING_PAGE_LABELS: Record<MarketingPageSlug, string> = {
  compare: "Compare",
  "test-drive": "Test Drive",
  "emi-calculator": "EMI Calculator",
  about: "About",
  contact: "Contact",
};

export type MarketingPageHeroConfig = {
  imageUrl: string;
  width: number;
  height: number;
  alt: string;
  imageFit: "cover" | "contain";
  objectPosition: string;
};

export type MarketingPageContent = {
  slug: MarketingPageSlug;
  hero: MarketingPageHeroConfig;
};
