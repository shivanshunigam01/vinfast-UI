import { adminGetData, adminPutJson, publicGet } from "@/lib/api";
import type { ModelPageContent, ModelPageGalleryContent, ModelPageSlug } from "@/data/modelPageGalleryTypes";

export async function fetchPublicModelPageGallery(slug: ModelPageSlug): Promise<ModelPageContent | null> {
  return publicGet<ModelPageContent>(`/public/model-pages/${slug}`);
}

export async function fetchAdminModelPageGallery(slug: ModelPageSlug): Promise<ModelPageContent | null> {
  try {
    return await adminGetData<ModelPageContent>(`/admin/model-pages/${slug}`);
  } catch {
    return null;
  }
}

export async function saveAdminModelPageGallery(
  slug: ModelPageSlug,
  body: Omit<ModelPageContent, "slug">,
): Promise<ModelPageGalleryContent> {
  return adminPutJson<ModelPageGalleryContent>(`/admin/model-pages/${slug}`, { slug, ...body });
}
