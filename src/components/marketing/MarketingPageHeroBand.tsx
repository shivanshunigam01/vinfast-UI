import { motion } from "framer-motion";

export type MarketingPageHeroBandProps = {
  ariaLabel: string;
  imageUrl: string;
  alt: string;
  imageFit?: "cover" | "contain";
  objectPosition?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Max height tuning — defaults match Compare / Test Drive pages */
  maxHeightLg?: string;
  clampHeight?: string;
};

export function MarketingPageHeroBand({
  ariaLabel,
  imageUrl,
  alt,
  imageFit = "cover",
  objectPosition = "center center",
  eyebrow,
  title,
  subtitle,
  maxHeightLg = "lg:max-h-[min(640px,calc(100dvh-4.25rem))]",
  clampHeight = "h-[clamp(240px,52vw,580px)]",
}: MarketingPageHeroBandProps) {
  return (
    <section className="border-b border-border/60 bg-muted/20" aria-label={ariaLabel}>
      <div className="relative w-full overflow-hidden pt-[4.25rem] lg:pt-0">
        <div
          className={`relative ${clampHeight} min-h-[240px] w-full max-h-[min(92dvh,calc(100dvh-4.25rem))] ${maxHeightLg}`}
        >
          <div className="hero-media-scrim absolute inset-0 overflow-hidden [transform:translateZ(0)]">
            <img
              src={imageUrl}
              alt={alt}
              className={`hero-slider-image h-full w-full ${imageFit === "contain" ? "object-contain" : "object-cover"}`}
              style={{ objectPosition }}
              sizes="100vw"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10"
            aria-hidden
          />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 lg:px-8 pb-8 sm:pb-10 md:pb-12 w-full">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto md:mx-0 text-center md:text-left"
              >
                <p className="text-primary font-display font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] mb-2 drop-shadow-sm">
                  {eyebrow}
                </p>
                <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 leading-tight text-foreground drop-shadow-sm">
                  {title}
                </h1>
                {subtitle ? (
                  <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto md:mx-0">{subtitle}</p>
                ) : null}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
