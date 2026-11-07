import { adminPostFormData } from "@/lib/api";

export async function uploadHomepageHeroImage(
  file: File,
  variant: "desktop" | "mobile" = "desktop",
): Promise<string> {
  const form = new FormData();
  form.append("image", file);
  const data = await adminPostFormData<{ url: string }>(
    `/admin/homepage/slides/upload?variant=${variant}`,
    form,
  );
  if (!data?.url) throw new Error("Server did not return an image URL");
  return data.url;
}
