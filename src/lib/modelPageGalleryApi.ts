import { adminGetData, adminPutJson, publicGet } from "@/lib/api";
import type { ModelPageGalleryContent, ModelPageSlug } from "@/data/modelPageGalleryTypes";

export async function fetchPublicModelPageGallery(slug: ModelPageSlug): Promise<ModelPageGalleryContent | null> {
  return publicGet<ModelPageGalleryContent>(`/public/model-pages/${slug}`);
}

export async function fetchAdminModelPageGallery(slug: ModelPageSlug): Promise<ModelPageGalleryContent | null> {
  try {
    return await adminGetData<ModelPageGalleryContent>(`/admin/model-pages/${slug}`);
  } catch {
    return null;
  }
}

export async function saveAdminModelPageGallery(
  slug: ModelPageSlug,
  body: Omit<ModelPageGalleryContent, "slug">,
): Promise<ModelPageGalleryContent> {
  return adminPutJson<ModelPageGalleryContent>(`/admin/model-pages/${slug}`, { slug, ...body });
}
