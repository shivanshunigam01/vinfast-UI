type ModelPageHeroProps = {
  /** Public URL under /model-heroes/ (high-res, not bundled). */
  imageSrc: string;
  alt: string;
  /** Intrinsic width of imageSrc (for layout + sharp scaling). */
  width: number;
  /** Intrinsic height of imageSrc. */
  height: number;
  ariaLabel: string;
  srTitle: string;
  /** Use contain to show full banner height (no top/bottom crop). Default cover. */
  imageFit?: "cover" | "contain";
};

/**
 * Full-viewport model hero — loads high-res static JPEG from /public for clarity.
 */
export function ModelPageHero({
  imageSrc,
  alt,
  width,
  height,
  ariaLabel,
  srTitle,
  imageFit = "cover",
}: ModelPageHeroProps) {
  const imageClass =
    imageFit === "contain" ? "model-page-hero-image model-page-hero-image--contain" : "model-page-hero-image";

  return (
    <section
      className="relative z-0 w-full max-w-none overflow-hidden bg-neutral-950 pt-[4.25rem]"
      aria-label={ariaLabel}
    >
      <div className={imageFit === "contain" ? "model-page-hero-frame model-page-hero-frame--contain" : "model-page-hero-frame"}>
        <img
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={imageClass}
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
      </div>
      <h1 className="sr-only">{srTitle}</h1>
    </section>
  );
}
