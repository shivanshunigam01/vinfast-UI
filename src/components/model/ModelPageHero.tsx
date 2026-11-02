import { useEffect } from "react";

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

function HeroPlaceholder({
  width,
  height,
  imageFit,
  ariaLabel,
  srTitle,
}: Pick<ModelPageHeroProps, "width" | "height" | "imageFit" | "ariaLabel" | "srTitle">) {
  const aspectRatio = `${width} / ${height}`;
  const frameClass = imageFit === "contain" ? "model-page-hero-frame-contain" : "model-page-hero-frame";

  return (
    <section
      className="relative z-0 w-full max-w-none overflow-hidden bg-neutral-950 pt-[4.25rem]"
      aria-label={ariaLabel}
      aria-busy="true"
    >
      <div
        className={`${frameClass} bg-neutral-900 animate-pulse`}
        style={imageFit === "contain" ? { aspectRatio, width: "100%", maxHeight: "calc(100dvh - 4.25rem)" } : undefined}
      />
      <h1 className="sr-only">{srTitle}</h1>
    </section>
  );
}

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
  const aspectRatio = `${width} / ${height}`;

  useEffect(() => {
    if (!imageSrc) return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = imageSrc;
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [imageSrc]);

  if (!imageSrc) {
    return (
      <HeroPlaceholder
        width={width}
        height={height}
        imageFit={imageFit}
        ariaLabel={ariaLabel}
        srTitle={srTitle}
      />
    );
  }

  if (imageFit === "contain") {
    return (
      <section
        className="relative z-0 w-full max-w-none overflow-hidden bg-neutral-950 pt-[4.25rem]"
        aria-label={ariaLabel}
      >
        <div className="model-page-hero-frame-contain">
          <img
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            className="model-page-hero-image-contain image-high-quality"
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            style={{ aspectRatio }}
          />
        </div>
        <h1 className="sr-only">{srTitle}</h1>
      </section>
    );
  }

  return (
    <section
      className="relative z-0 w-full max-w-none overflow-hidden bg-neutral-950 pt-[4.25rem]"
      aria-label={ariaLabel}
    >
      <div className="model-page-hero-frame">
        <img
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className="model-page-hero-image image-high-quality"
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
