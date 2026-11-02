import { useEffect, useMemo, useState } from "react";
import { hasApi } from "@/lib/apiConfig";
import { fetchPublicModelPageGallery } from "@/lib/modelPageGalleryApi";
import type { ModelPageContent, ModelPageSlug } from "@/data/modelPageGalleryTypes";
import { getDefaultModelPageContent } from "@/data/modelPageContentDefaults";

export function useModelPageContent(slug: ModelPageSlug): ModelPageContent {
  const fallback = useMemo(() => getDefaultModelPageContent(slug), [slug]);
  const [remote, setRemote] = useState<Partial<ModelPageContent> | null>(null);

  useEffect(() => {
    if (!hasApi()) return;
    let cancelled = false;
    fetchPublicModelPageGallery(slug).then((data) => {
      if (!cancelled && data) setRemote(data as Partial<ModelPageContent>);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const gallery =
    remote?.features?.length && remote.galleryTitle !== undefined
      ? {
          slug,
          galleryLabel: remote.galleryLabel ?? fallback.galleryLabel,
          galleryTitle: remote.galleryTitle ?? fallback.galleryTitle,
          galleryIntro: remote.galleryIntro ?? fallback.galleryIntro,
          features: remote.features,
        }
      : {
          slug: fallback.slug,
          galleryLabel: fallback.galleryLabel,
          galleryTitle: fallback.galleryTitle,
          galleryIntro: fallback.galleryIntro,
          features: fallback.features,
        };

  const hero =
    remote?.hero?.imageUrl?.trim()
      ? {
          imageUrl: remote.hero.imageUrl,
          width: remote.hero.width || fallback.hero.width,
          height: remote.hero.height || fallback.hero.height,
          alt: remote.hero.alt || fallback.hero.alt,
          imageFit: remote.hero.imageFit === "contain" ? "contain" : "cover",
        }
      : fallback.hero;

  return { ...gallery, slug, hero };
}

/** @deprecated use useModelPageContent */
export function useModelPageGallery(slug: ModelPageSlug) {
  const { slug: _s, hero: _h, ...gallery } = useModelPageContent(slug);
  return gallery;
}
