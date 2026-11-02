import { cloneModelPageGallery, getDefaultModelPageGallery } from "@/data/modelPageGalleryDefaults";
import { getDefaultModelPageHero } from "@/data/modelPageHeroDefaults";
import type { ModelPageContent, ModelPageSlug } from "@/data/modelPageGalleryTypes";

export function getDefaultModelPageContent(slug: ModelPageSlug): ModelPageContent {
  const gallery = getDefaultModelPageGallery(slug);
  return {
    ...gallery,
    slug,
    hero: getDefaultModelPageHero(slug),
  };
}

export function cloneModelPageContent(content: ModelPageContent): ModelPageContent {
  const cloned = cloneModelPageGallery(content);
  return {
    ...cloned,
    slug: content.slug,
    hero: { ...content.hero },
  };
}
