import type { ModelPageGalleryContent } from "@/data/modelPageGalleryTypes";

type ModelPageFeatureGalleryProps = {
  content: ModelPageGalleryContent;
};

export function ModelPageFeatureGallery({ content }: ModelPageFeatureGalleryProps) {
  const wide = content.features
    .filter((f) => f.active !== false && f.layout === "wide")
    .sort((a, b) => a.order - b.order);
  const standard = content.features
    .filter((f) => f.active !== false && f.layout !== "wide")
    .sort((a, b) => a.order - b.order);

  if (wide.length === 0 && standard.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-background border-y border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            {content.galleryLabel || "Gallery"}
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">{content.galleryTitle}</h2>
          {content.galleryIntro ? (
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{content.galleryIntro}</p>
          ) : null}
        </div>

        {wide.length > 0 ? (
          <div className="grid gap-10 lg:gap-12 md:grid-cols-2 mb-14 lg:mb-20">
            {wide.map((item) => (
              <article key={item.id ?? `${item.title}-${item.order}`} className="flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/50 bg-muted/30 shadow-sm">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.alt || item.title}
                      className="image-high-quality absolute inset-0 h-full w-full object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div className="mt-5 md:mt-6">
                  <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {standard.length > 0 ? (
          <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
            {standard.map((item) => (
              <article key={item.id ?? `${item.title}-${item.order}`} className="flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/50 bg-muted/20">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.alt || item.title}
                      className="image-high-quality absolute inset-0 h-full w-full object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div className="mt-4 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-lg md:text-xl text-foreground leading-snug">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
