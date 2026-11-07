import type { MarketingPageHeroConfig, MarketingPageSlug } from "@/data/marketingPageTypes";

const KEY_PREFIX = "vf_marketing_page_";

export function readMarketingPageCache(slug: MarketingPageSlug): MarketingPageHeroConfig | null {
  try {
    const raw = sessionStorage.getItem(`${KEY_PREFIX}${slug}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MarketingPageHeroConfig;
    return parsed?.imageUrl?.trim() ? parsed : null;
  } catch {
    return null;
  }
}

export function writeMarketingPageCache(slug: MarketingPageSlug, hero: MarketingPageHeroConfig) {
  try {
    sessionStorage.setItem(`${KEY_PREFIX}${slug}`, JSON.stringify(hero));
  } catch {
    /* ignore quota */
  }
}
