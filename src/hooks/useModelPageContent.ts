import { useEffect, useMemo, useState } from "react";
import { hasApi } from "@/lib/apiConfig";
import { fetchPublicModelPageGallery } from "@/lib/modelPageGalleryApi";
import { readModelPageCache, writeModelPageCache } from "@/lib/modelPageContentCache";
import type { ModelPageContent, ModelPageHeroConfig, ModelPageSlug } from "@/data/modelPageGalleryTypes";
import { getDefaultModelPageContent } from "@/data/modelPageContentDefaults";

function mergeHero(fallback: ModelPageHeroConfig, remote?: Partial<ModelPageHeroConfig> | null): ModelPageHeroConfig | null {
  const url = remote?.imageUrl?.trim();
  if (!url) return null;
  return {
    imageUrl: url,
    width: remote?.width || fallback.width,
    height: remote?.height || fallback.height,
    alt: remote?.alt || fallback.alt,
    imageFit: remote?.imageFit === "contain" ? "contain" : "cover",
  };
}

function mergeGalleryContent(
  slug: ModelPageSlug,
  fallback: ModelPageContent,
  remote: Partial<ModelPageContent> | null,
  fetchDone: boolean,
): Omit<ModelPageContent, "hero"> {
  if (remote?.features?.length) {
    return {
      slug,
      galleryLabel: remote.galleryLabel ?? fallback.galleryLabel,
      galleryTitle: remote.galleryTitle ?? fallback.galleryTitle,
      galleryIntro: remote.galleryIntro ?? fallback.galleryIntro,
      features: remote.features,
    };
  }
  if (!fetchDone && hasApi()) {
    return {
      slug,
      galleryLabel: fallback.galleryLabel,
      galleryTitle: fallback.galleryTitle,
      galleryIntro: fallback.galleryIntro,
      features: [],
    };
  }
  return {
    slug: fallback.slug,
    galleryLabel: fallback.galleryLabel,
    galleryTitle: fallback.galleryTitle,
    galleryIntro: fallback.galleryIntro,
    features: fallback.features,
  };
}

export type ModelPageContentState = ModelPageContent & {
  /** Hero can render (not waiting on API to avoid default-image flash). */
  isHeroReady: boolean;
};

export function useModelPageContent(slug: ModelPageSlug): ModelPageContentState {
  const fallback = useMemo(() => getDefaultModelPageContent(slug), [slug]);
  const apiEnabled = hasApi();

  const [remote, setRemote] = useState<Partial<ModelPageContent> | null>(() =>
    apiEnabled ? readModelPageCache(slug) : null,
  );
  const [fetchDone, setFetchDone] = useState(() => !apiEnabled);

  useEffect(() => {
    if (!apiEnabled) return;
    let cancelled = false;
    fetchPublicModelPageGallery(slug)
      .then((data) => {
        if (cancelled) return;
        if (data) {
          setRemote(data as Partial<ModelPageContent>);
          writeModelPageCache(slug, data as Partial<ModelPageContent>);
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

  const cmsHero = mergeHero(fallback.hero, remote?.hero);
  const gallery = mergeGalleryContent(slug, fallback, remote, fetchDone);

  let hero: ModelPageHeroConfig;
  let isHeroReady: boolean;

  if (!apiEnabled) {
    hero = fallback.hero;
    isHeroReady = true;
  } else if (cmsHero) {
    hero = cmsHero;
    isHeroReady = true;
  } else if (!fetchDone) {
    hero = { ...fallback.hero, imageUrl: "" };
    isHeroReady = false;
  } else {
    hero = fallback.hero;
    isHeroReady = true;
  }

  return { ...gallery, slug, hero, isHeroReady };
}

/** @deprecated use useModelPageContent */
export function useModelPageGallery(slug: ModelPageSlug) {
  const { isHeroReady: _r, hero: _h, ...gallery } = useModelPageContent(slug);
  return gallery;
}
