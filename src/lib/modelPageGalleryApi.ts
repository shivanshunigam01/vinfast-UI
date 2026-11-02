import { adminGetData, adminPostFormData, adminPutJson, publicGet } from "@/lib/api";
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

export async function uploadModelPageImage(slug: ModelPageSlug, file: File): Promise<string> {
  const form = new FormData();
  form.append("image", file);
  const data = await adminPostFormData<{ url: string }>(`/admin/model-pages/${slug}/upload`, form);
  if (!data?.url) throw new Error("Server did not return an image URL");
  return data.url;
}
