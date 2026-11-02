import { useId, useState } from "react";
import { Upload, X, Loader2, FolderOpen } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { hasApi } from "@/lib/apiConfig";
import { uploadModelPageImage } from "@/lib/modelPageGalleryApi";
import type { ModelPageSlug } from "@/data/modelPageGalleryTypes";

type ModelPageServerImageUploadProps = {
  slug: ModelPageSlug;
  value?: string;
  onUpload: (url: string) => void;
  label?: string;
  aspectRatio?: string;
  disabled?: boolean;
};

export function ModelPageServerImageUpload({
  slug,
  value,
  onUpload,
  label = "Upload image",
  aspectRatio = "16/9",
  disabled = false,
}: ModelPageServerImageUploadProps) {
  const fileInputId = useId();
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || disabled) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file (JPG, PNG, or WebP).");
      return;
    }
    if (!hasApi()) {
      toast.error("API not configured — set VITE_API_URL to upload to the server.");
      return;
    }
    setUploading(true);
    try {
      const url = await uploadModelPageImage(slug, file);
      onUpload(url);
      toast.success("Image uploaded to Cloudinary");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative rounded-xl overflow-hidden bg-secondary/30 border border-border/50" style={{ aspectRatio }}>
          <img src={value} alt="Uploaded" className="w-full h-full object-contain bg-neutral-950" />
          {!disabled ? (
            <button
              type="button"
              onClick={() => onUpload("")}
              className="absolute top-2 right-2 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center hover:bg-destructive transition-colors"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          ) : null}
        </div>
      ) : (
        <div
          className={cn(
            "rounded-xl border-2 border-dashed border-border/50 bg-secondary/20 flex flex-col items-center justify-center gap-3 py-6 px-4",
            (uploading || disabled) && "opacity-70 pointer-events-none",
          )}
          style={{ aspectRatio }}
        >
          <Upload className="w-6 h-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-center">{label}</p>
          <label
            htmlFor={fileInputId}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow cursor-pointer hover:bg-primary/90",
            )}
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FolderOpen className="h-4 w-4" />}
            {uploading ? "Uploading…" : "Choose from computer"}
          </label>
          <input
            id={fileInputId}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/*"
            className="sr-only"
            onChange={handleFile}
            disabled={uploading || disabled}
          />
          <p className="text-[10px] text-muted-foreground/70 text-center max-w-[16rem]">
            Uploaded via your API using Cloudinary (same account as .env). Max ~12 MB.
          </p>
        </div>
      )}

      {value && !disabled ? (
        <label
          htmlFor={`${fileInputId}-replace`}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-accent"
        >
          {uploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <FolderOpen className="h-3 w-3" />}
          Replace image
          <input
            id={`${fileInputId}-replace`}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/*"
            className="sr-only"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
      ) : null}
    </div>
  );
}
