import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw, Save } from "lucide-react";
import { MarketingPageServerImageUpload } from "@/components/admin/MarketingPageServerImageUpload";
import { hasApi } from "@/lib/apiConfig";
import { formatApiErrors } from "@/lib/api";
import { fetchAdminMarketingPageHero, saveAdminMarketingPageHero } from "@/lib/marketingPageApi";
import { writeMarketingPageCache } from "@/lib/marketingPageContentCache";
import { canPerformAction, getAdminUser } from "@/lib/adminAuth";
import { getDefaultMarketingPageContent } from "@/data/marketingPageHeroDefaults";
import {
  MARKETING_PAGE_LABELS,
  MARKETING_PAGE_SLUGS,
  type MarketingPageContent,
  type MarketingPageSlug,
} from "@/data/marketingPageTypes";
import { toast } from "sonner";

function MarketingPageHeroEditor({ slug, canEdit }: { slug: MarketingPageSlug; canEdit: boolean }) {
  const [form, setForm] = useState<MarketingPageContent>(() => getDefaultMarketingPageContent(slug));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadedFromApi, setLoadedFromApi] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const defaults = getDefaultMarketingPageContent(slug);
    if (!hasApi()) {
      setForm(defaults);
      setLoadedFromApi(false);
      setLoading(false);
      return;
    }
    try {
      const remote = await fetchAdminMarketingPageHero(slug);
      if (remote?.hero?.imageUrl?.trim()) {
        setForm({
          slug,
          hero: { ...defaults.hero, ...remote.hero },
        });
        setLoadedFromApi(true);
      } else {
        setForm(defaults);
        setLoadedFromApi(false);
      }
    } catch {
      setForm(defaults);
      setLoadedFromApi(false);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  const resetToSiteDefaults = () => {
    setForm(getDefaultMarketingPageContent(slug));
    toast.message("Loaded current website defaults — upload and Save to publish a new banner.");
  };

  const handleSave = async () => {
    if (!canEdit) return;
    const hero = {
      ...form.hero,
      width: Number(form.hero.width) || 3840,
      height: Number(form.hero.height) || 2160,
      alt: form.hero.alt.trim(),
      objectPosition: form.hero.objectPosition.trim() || "center center",
    };
    if (!hero.imageUrl.trim()) {
      toast.error("Upload a hero banner image before saving.");
      return;
    }
    if (!hasApi()) {
      toast.error("API not configured — set VITE_API_URL to save.");
      return;
    }
    setSaving(true);
    try {
      const saved = await saveAdminMarketingPageHero(slug, hero);
      writeMarketingPageCache(slug, saved.hero);
      setLoadedFromApi(true);
      toast.success(`${MARKETING_PAGE_LABELS[slug]} hero banner saved.`);
      await load();
    } catch (err) {
      toast.error(formatApiErrors(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-muted-foreground py-8">Loading…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <p className="text-sm text-muted-foreground">
          {loadedFromApi
            ? "Published banner is live on the public page when the API is connected."
            : "Using bundled site defaults until you upload and save."}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={resetToSiteDefaults} className="gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" /> Reset to site defaults
          </Button>
          <Button type="button" size="sm" onClick={handleSave} disabled={!canEdit || saving} className="gap-1.5">
            <Save className="w-3.5 h-3.5" /> {saving ? "Saving…" : "Save banner"}
          </Button>
        </div>
      </div>

      <Card className="p-4 md:p-6 space-y-4">
        <h3 className="font-display font-semibold text-lg">Hero banner</h3>
        <p className="text-xs text-muted-foreground">
          Same workflow as model pages — upload via Cloudinary. Visitors see the bundled default until you save here.
        </p>
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <div className="space-y-2">
            <Label>Banner preview</Label>
            <div className="aspect-[16/9] rounded-lg overflow-hidden border bg-muted/30">
              {form.hero.imageUrl ? (
                <img src={form.hero.imageUrl} alt="" className="w-full h-full object-contain bg-neutral-950" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground px-2 text-center">
                  No banner yet
                </div>
              )}
            </div>
            {canEdit ? (
              <MarketingPageServerImageUpload
                slug={slug}
                value={form.hero.imageUrl}
                onUpload={(url) => setForm({ ...form, hero: { ...form.hero, imageUrl: url } })}
                label="Upload hero banner"
                aspectRatio="16/9"
              />
            ) : null}
          </div>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Alt text</Label>
              <Input
                value={form.hero.alt}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, alt: e.target.value } })}
                disabled={!canEdit}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Image width (px)</Label>
                <Input
                  type="number"
                  value={form.hero.width}
                  onChange={(e) =>
                    setForm({ ...form, hero: { ...form.hero, width: Number(e.target.value) || 3840 } })
                  }
                  disabled={!canEdit}
                />
              </div>
              <div className="space-y-2">
                <Label>Image height (px)</Label>
                <Input
                  type="number"
                  value={form.hero.height}
                  onChange={(e) =>
                    setForm({ ...form, hero: { ...form.hero, height: Number(e.target.value) || 2160 } })
                  }
                  disabled={!canEdit}
                />
              </div>
              <div className="space-y-2">
                <Label>Display fit</Label>
                <Select
                  value={form.hero.imageFit}
                  onValueChange={(v) =>
                    setForm({ ...form, hero: { ...form.hero, imageFit: v as "cover" | "contain" } })
                  }
                  disabled={!canEdit}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cover">Cover (full bleed)</SelectItem>
                    <SelectItem value="contain">Contain (full banner visible)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Object position</Label>
              <Input
                value={form.hero.objectPosition}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, objectPosition: e.target.value } })}
                placeholder="e.g. center 55%"
                disabled={!canEdit}
              />
              <p className="text-[11px] text-muted-foreground">CSS object-position when using cover (crop focus).</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function AdminMarketingPages() {
  const user = getAdminUser();
  const canEdit = canPerformAction(user, "products", "update");

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">Marketing page heroes</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Hero banners for Compare, Test Drive, EMI Calculator, About, and Contact — same as model page uploads.
          Requires Products → Edit permission.
        </p>
      </div>

      <Tabs defaultValue="compare">
        <TabsList className="flex flex-wrap h-auto gap-1">
          {MARKETING_PAGE_SLUGS.map((slug) => (
            <TabsTrigger key={slug} value={slug}>
              {MARKETING_PAGE_LABELS[slug]}
            </TabsTrigger>
          ))}
        </TabsList>
        {MARKETING_PAGE_SLUGS.map((slug) => (
          <TabsContent key={slug} value={slug} className="mt-6">
            <MarketingPageHeroEditor slug={slug} canEdit={canEdit} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
