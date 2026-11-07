import { useState } from "react";

export type ModelPageColorStudioShade = {
  name: string;
  hex: string;
  image: string;
  alt?: string;
};

type ModelPageColorStudioProps = {
  modelLabel: string;
  intro?: string;
  shades: ModelPageColorStudioShade[];
};

export function ModelPageColorStudio({ modelLabel, intro, shades }: ModelPageColorStudioProps) {
  const [selected, setSelected] = useState(0);
  const list = shades.length ? shades : [];
  if (!list.length) return null;

  const idx = Math.min(selected, list.length - 1);
  const current = list[idx];

  return (
    <section className="py-14 sm:py-20 lg:py-24 section-surface">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.2em] mb-3">Color Studio</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-8">Choose Your Shade</h2>
        {intro ? (
          <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-8">{intro}</p>
        ) : null}
        <div className="max-w-5xl mx-auto mb-8 rounded-3xl overflow-hidden bg-[#F0F0F0]">
          <img
            src={current.image}
            alt={current.alt || `${modelLabel} in ${current.name}`}
            className="image-high-quality h-auto w-full object-contain"
            sizes="(max-width: 768px) 100vw, 896px"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          {list.map((c, i) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setSelected(i)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${i === idx ? "border-primary scale-110 shadow-glow-red" : "border-foreground/10"}`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
              aria-pressed={i === idx}
            />
          ))}
        </div>
        <p className="text-muted-foreground text-sm">{current.name}</p>
      </div>
    </section>
  );
}
