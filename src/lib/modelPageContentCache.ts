import type { ModelPageContent, ModelPageSlug } from "@/data/modelPageGalleryTypes";

const PREFIX = "vinfast_model_page_v1_";

type CachedModelPage = Partial<ModelPageContent> & { cachedAt?: number };

export function readModelPageCache(slug: ModelPageSlug): CachedModelPage | null {
  if (typeof sessionStorage === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(`${PREFIX}${slug}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedModelPage;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeModelPageCache(slug: ModelPageSlug, data: Partial<ModelPageContent>): void {
  if (typeof sessionStorage === "undefined") return;
  try {
    const payload: CachedModelPage = { ...data, cachedAt: Date.now() };
    sessionStorage.setItem(`${PREFIX}${slug}`, JSON.stringify(payload));
  } catch {
    /* quota / private mode */
  }
}
