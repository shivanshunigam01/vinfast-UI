import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, RotateCcw, Save, GripVertical } from "lucide-react";
import { ModelPageServerImageUpload } from "@/components/admin/ModelPageServerImageUpload";
import { hasApi } from "@/lib/apiConfig";
import { formatApiErrors } from "@/lib/api";
import { fetchAdminModelPageGallery, saveAdminModelPageGallery } from "@/lib/modelPageGalleryApi";
import { canPerformAction, getAdminUser } from "@/lib/adminAuth";
import { cloneModelPageContent, getDefaultModelPageContent } from "@/data/modelPageContentDefaults";
import {
  MODEL_PAGE_LABELS,
  MODEL_PAGE_SLUGS,
  type ModelPageContent,
  type ModelPageFeatureItem,
  type ModelPageSlug,
} from "@/data/modelPageGalleryTypes";
import { toast } from "sonner";

function newFeature(order: number): ModelPageFeatureItem {
  return {
    imageUrl: "",
    title: "",
    description: "",
    alt: "",
    layout: "standard",
    order,
    active: true,
  };
}

function ModelPageEditor({
  slug,
  canEdit,
}: {
  slug: ModelPageSlug;
  canEdit: boolean;
}) {
  const [form, setForm] = useState<ModelPageContent>(() => getDefaultModelPageContent(slug));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadedFromApi, setLoadedFromApi] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const defaults = getDefaultModelPageContent(slug);
    if (!hasApi()) {
      setForm(defaults);
      setLoadedFromApi(false);
      setLoading(false);
      return;
    }
    try {
      const remote = await fetchAdminModelPageGallery(slug);
      if (remote?.features?.length || remote?.hero?.imageUrl) {
        setForm(
          cloneModelPageContent({
            ...defaults,
            ...remote,
            slug,
            hero: remote.hero?.imageUrl ? { ...defaults.hero, ...remote.hero } : defaults.hero,
            features: remote.features?.length ? remote.features : defaults.features,
          }),
        );
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

  const updateFeature = (index: number, patch: Partial<ModelPageFeatureItem>) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.map((f, i) => (i === index ? { ...f, ...patch } : f)),
    }));
  };

  const removeFeature = (index: number) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index).map((f, i) => ({ ...f, order: i })),
    }));
  };

  const addFeature = (layout: "wide" | "standard") => {
    setForm((prev) => ({
      ...prev,
      features: [...prev.features, newFeature(prev.features.length)].map((f, i) =>
        i === prev.features.length ? { ...f, layout } : f,
      ),
    }));
  };

  const resetToSiteDefaults = () => {
    setForm(getDefaultModelPageContent(slug));
    toast.message("Loaded current website defaults — click Save to publish.");
  };

  const handleSave = async () => {
    if (!canEdit) return;
    const features = form.features
      .filter((f) => f.title.trim())
      .map((f, i) => ({
        ...f,
        order: Number.isFinite(f.order) ? f.order : i,
        alt: f.alt.trim() || f.title.trim(),
      }));
    const hero = {
      ...form.hero,
      width: Number(form.hero.width) || 3840,
      height: Number(form.hero.height) || 2160,
      alt: form.hero.alt.trim(),
    };
    if (features.length === 0 && !hero.imageUrl.trim()) {
      toast.error("Add a hero banner image or at least one gallery feature with a title.");
      return;
    }
    if (!hasApi()) {
      toast.error("API not configured — set VITE_API_URL to save.");
      return;
    }
    setSaving(true);
    try {
      await saveAdminModelPageGallery(slug, {
        galleryLabel: form.galleryLabel,
        galleryTitle: form.galleryTitle,
        galleryIntro: form.galleryIntro,
        features,
        hero,
      });
      setLoadedFromApi(true);
      toast.success(`${MODEL_PAGE_LABELS[slug]} page content saved.`);
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
            ? "Published content is live on the model page when the API is connected."
            : "Using bundled site defaults until you save — visitors see defaults until then."}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={resetToSiteDefaults} className="gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" /> Reset to site defaults
          </Button>
          <Button type="button" size="sm" onClick={handleSave} disabled={!canEdit || saving} className="gap-1.5">
            <Save className="w-3.5 h-3.5" /> {saving ? "Saving…" : "Save page"}
          </Button>
        </div>
      </div>

      <Card className="p-4 md:p-6 space-y-4">
        <h3 className="font-display font-semibold text-lg">Hero banner (top of model page)</h3>
        <p className="text-xs text-muted-foreground">
          Upload a wide banner (saved on your API server). Use &quot;Contain&quot; for cinematic banners with text baked in;
          &quot;Cover&quot; for full-bleed photos.
        </p>
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <div className="space-y-2">
            <Label>Banner preview</Label>
            <div className="aspect-[16/9] rounded-lg overflow-hidden border bg-muted/30">
              {form.hero.imageUrl ? (
                <img src={form.hero.imageUrl} alt="" className="w-full h-full object-contain bg-neutral-950" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground px-2 text-center">
                  No banner — bundled default used on site
                </div>
              )}
            </div>
            {canEdit ? (
              <ModelPageServerImageUpload
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
                    <SelectItem value="cover">Cover (full viewport)</SelectItem>
                    <SelectItem value="contain">Contain (full banner visible)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 md:p-6 space-y-4">
        <h3 className="font-display font-semibold text-lg">Gallery section header</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Small label</Label>
            <Input
              value={form.galleryLabel}
              onChange={(e) => setForm({ ...form, galleryLabel: e.target.value })}
              placeholder="Gallery"
              disabled={!canEdit}
            />
          </div>
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input
              value={form.galleryTitle}
              onChange={(e) => setForm({ ...form, galleryTitle: e.target.value })}
              placeholder="VF 6 in detail"
              disabled={!canEdit}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Intro paragraph</Label>
          <Textarea
            value={form.galleryIntro}
            onChange={(e) => setForm({ ...form, galleryIntro: e.target.value })}
            rows={3}
            disabled={!canEdit}
          />
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" size="sm" onClick={() => addFeature("wide")} disabled={!canEdit}>
          <Plus className="w-3.5 h-3.5 mr-1" /> Large feature card
        </Button>
        <Button type="button" variant="secondary" size="sm" onClick={() => addFeature("standard")} disabled={!canEdit}>
          <Plus className="w-3.5 h-3.5 mr-1" /> Detail card
        </Button>
      </div>

      <div className="space-y-4">
        {form.features.map((item, index) => (
          <Card key={`${slug}-feature-${index}`} className="p-4 md:p-5 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <GripVertical className="w-4 h-4 shrink-0" />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  {item.layout === "wide" ? "Large card" : "Detail card"} · #{index + 1}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={item.active}
                    onCheckedChange={(v) => updateFeature(index, { active: v })}
                    disabled={!canEdit}
                  />
                  <span className="text-xs text-muted-foreground">Visible</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => removeFeature(index)}
                  disabled={!canEdit}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
              <div className="space-y-2">
                <Label>Image</Label>
                <div className="aspect-[4/3] rounded-lg overflow-hidden border bg-muted/30">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground px-2 text-center">
                      Upload image
                    </div>
                  )}
                </div>
                {canEdit ? (
                  <ModelPageServerImageUpload
                    slug={slug}
                    value={item.imageUrl}
                    onUpload={(url) => updateFeature(index, { imageUrl: url })}
                    label="Upload / replace"
                    aspectRatio="4/3"
                  />
                ) : null}
              </div>

              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Layout</Label>
                    <Select
                      value={item.layout}
                      onValueChange={(v) => updateFeature(index, { layout: v as "wide" | "standard" })}
                      disabled={!canEdit}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wide">Large (2-column row)</SelectItem>
                        <SelectItem value="standard">Detail (3-column grid)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sort order</Label>
                    <Input
                      type="number"
                      value={item.order}
                      onChange={(e) => updateFeature(index, { order: Number(e.target.value) })}
                      disabled={!canEdit}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={item.title}
                    onChange={(e) => updateFeature(index, { title: e.target.value })}
                    disabled={!canEdit}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={item.description}
                    onChange={(e) => updateFeature(index, { description: e.target.value })}
                    rows={3}
                    disabled={!canEdit}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image alt text</Label>
                  <Input
                    value={item.alt}
                    onChange={(e) => updateFeature(index, { alt: e.target.value })}
                    placeholder="Defaults to title if empty"
                    disabled={!canEdit}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function AdminModelPages() {
  const user = getAdminUser();
  const canEdit = canPerformAction(user, "products", "update");

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">Model pages</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Hero banners and &quot;in detail&quot; galleries for VF 6, VF 7, and VF MPV 7. Requires Products → Edit permission.
        </p>
      </div>

      <Tabs defaultValue="vf6">
        <TabsList className="flex flex-wrap h-auto gap-1">
          {MODEL_PAGE_SLUGS.map((slug) => (
            <TabsTrigger key={slug} value={slug}>
              {MODEL_PAGE_LABELS[slug]}
            </TabsTrigger>
          ))}
        </TabsList>
        {MODEL_PAGE_SLUGS.map((slug) => (
          <TabsContent key={slug} value={slug} className="mt-6">
            <ModelPageEditor slug={slug} canEdit={canEdit} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
