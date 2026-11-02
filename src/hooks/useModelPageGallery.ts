import { useEffect, useMemo, useState } from "react";
import { hasApi } from "@/lib/apiConfig";
import { fetchPublicModelPageGallery } from "@/lib/modelPageGalleryApi";
import type { ModelPageGalleryContent, ModelPageSlug } from "@/data/modelPageGalleryTypes";
import { getDefaultModelPageGallery } from "@/data/modelPageGalleryDefaults";

export function useModelPageGallery(slug: ModelPageSlug): ModelPageGalleryContent {
  const fallback = useMemo(() => getDefaultModelPageGallery(slug), [slug]);
  const [remote, setRemote] = useState<ModelPageGalleryContent | null>(null);

  useEffect(() => {
    if (!hasApi()) return;
    let cancelled = false;
    fetchPublicModelPageGallery(slug).then((data) => {
      if (!cancelled && data?.features?.length) setRemote(data);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return remote ?? fallback;
}
