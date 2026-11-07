import type { ModelPageHeroConfig, ModelPageSlug } from "@/data/modelPageGalleryTypes";
import limoGreenHeroDesktop from "@/assets/limo-green/hero-desktop.jpg";

const heroExtras = {
  showcaseOnHomepage: false,
  homepageHeroOrder: 10,
  homepageHeroTitle: "",
  homepageHeroSubtitle: "",
  homepageHeroBadge: "",
  homepageObjectPosition: "center center",
};

const VF6_HERO: ModelPageHeroConfig = {
  imageUrl: "/model-heroes/vf6-hero.jpg?v=3",
  width: 3840,
  height: 2160,
  alt: "VinFast VF 6 — Built for a brighter tomorrow.",
  imageFit: "cover",
  ...heroExtras,
};

const VF7_HERO: ModelPageHeroConfig = {
  imageUrl: "/model-heroes/vf7-hero.jpg?v=3",
  width: 3840,
  height: 1706,
  alt: "VinFast VF 7 — Born Sporty. Effortlessly Sophisticated.",
  imageFit: "contain",
  ...heroExtras,
};

const MPV7_HERO: ModelPageHeroConfig = {
  imageUrl: "/model-heroes/mpv7-hero.jpg?v=4",
  width: 3840,
  height: 2160,
  alt: "VinFast VF MPV 7 — Your World. On The Move.",
  imageFit: "contain",
  ...heroExtras,
};

const LIMO_GREEN_HERO: ModelPageHeroConfig = {
  imageUrl: limoGreenHeroDesktop,
  width: 3840,
  height: 2160,
  alt: "VinFast Limo Green — Built for your business.",
  imageFit: "cover",
  ...heroExtras,
};

const BY_SLUG: Record<ModelPageSlug, ModelPageHeroConfig> = {
  vf6: VF6_HERO,
  vf7: VF7_HERO,
  mpv7: MPV7_HERO,
  "limo-green": LIMO_GREEN_HERO,
};

export function getDefaultModelPageHero(slug: ModelPageSlug): ModelPageHeroConfig {
  return { ...BY_SLUG[slug] };
}
