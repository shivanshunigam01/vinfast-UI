import { adminGetData, adminPostFormData, adminPutJson, publicGet } from "@/lib/api";
import type { MarketingPageContent, MarketingPageSlug } from "@/data/marketingPageTypes";

export async function fetchPublicMarketingPageHero(
  slug: MarketingPageSlug,
): Promise<Pick<MarketingPageContent, "slug" | "hero"> | null> {
  try {
    return await publicGet<Pick<MarketingPageContent, "slug" | "hero">>(`/public/marketing-pages/${slug}`);
  } catch {
    return null;
  }
}

export async function fetchAdminMarketingPageHero(
  slug: MarketingPageSlug,
): Promise<Pick<MarketingPageContent, "slug" | "hero"> | null> {
  try {
    return await adminGetData<Pick<MarketingPageContent, "slug" | "hero">>(`/admin/marketing-pages/${slug}`);
  } catch {
    return null;
  }
}

export async function saveAdminMarketingPageHero(
  slug: MarketingPageSlug,
  hero: MarketingPageContent["hero"],
): Promise<Pick<MarketingPageContent, "slug" | "hero">> {
  return adminPutJson<Pick<MarketingPageContent, "slug" | "hero">>(`/admin/marketing-pages/${slug}`, {
    slug,
    hero,
  });
}

export async function uploadMarketingPageImage(slug: MarketingPageSlug, file: File): Promise<string> {
  const form = new FormData();
  form.append("image", file);
  const data = await adminPostFormData<{ url: string }>(`/admin/marketing-pages/${slug}/upload`, form);
  if (!data?.url) throw new Error("Server did not return an image URL");
  return data.url;
}
