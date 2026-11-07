import { useEffect, useMemo, useState } from "react";
import { hasApi } from "@/lib/apiConfig";
import { fetchPublicMarketingPageHero } from "@/lib/marketingPageApi";
import { readMarketingPageCache, writeMarketingPageCache } from "@/lib/marketingPageContentCache";
import { getDefaultMarketingPageHero } from "@/data/marketingPageHeroDefaults";
import type { MarketingPageHeroConfig, MarketingPageSlug } from "@/data/marketingPageTypes";

function mergeHero(
  fallback: MarketingPageHeroConfig,
  remote?: Partial<MarketingPageHeroConfig> | null,
): MarketingPageHeroConfig | null {
  const url = remote?.imageUrl?.trim();
  if (!url) return null;
  return {
    imageUrl: url,
    width: remote?.width || fallback.width,
    height: remote?.height || fallback.height,
    alt: remote?.alt || fallback.alt,
    imageFit: remote?.imageFit === "contain" ? "contain" : "cover",
    objectPosition: remote?.objectPosition?.trim() || fallback.objectPosition,
  };
}

export type MarketingPageHeroState = MarketingPageHeroConfig & {
  isHeroReady: boolean;
};

export function useMarketingPageHero(slug: MarketingPageSlug): MarketingPageHeroState {
  const fallback = useMemo(() => getDefaultMarketingPageHero(slug), [slug]);
  const apiEnabled = hasApi();

  const [remote, setRemote] = useState<Partial<MarketingPageHeroConfig> | null>(() =>
    apiEnabled ? readMarketingPageCache(slug) : null,
  );
  const [fetchDone, setFetchDone] = useState(() => !apiEnabled);

  useEffect(() => {
    if (!apiEnabled) return;
    let cancelled = false;
    fetchPublicMarketingPageHero(slug)
      .then((data) => {
        if (cancelled) return;
        if (data?.hero?.imageUrl?.trim()) {
          setRemote(data.hero);
          writeMarketingPageCache(slug, data.hero);
        } else {
          setRemote(null);
        }
      })
      .finally(() => {
        if (!cancelled) setFetchDone(true);
      });
    return () => {
      cancelled = true;
    };
  }, [slug, apiEnabled]);

  const cmsHero = mergeHero(fallback, remote);

  if (!apiEnabled) {
    return { ...fallback, isHeroReady: true };
  }
  if (cmsHero) {
    return { ...cmsHero, isHeroReady: true };
  }
  if (!fetchDone) {
    return { ...fallback, imageUrl: "", isHeroReady: false };
  }
  return { ...fallback, isHeroReady: true };
}
