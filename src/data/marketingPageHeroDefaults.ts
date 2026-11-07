import compareHeroBanner from "@/assets/compare/compare-hero-fleet-sunset.jpg";
import testDriveHeroBanner from "@/assets/test-drive/test-drive-hero-sunset.jpg";
import emiHeroBanner from "@/assets/emi/emi-calculator-hero.jpg";
import patliputraShowroomHero from "@/assets/about/patliputra-showroom-hero.jpg";
import type { MarketingPageHeroConfig, MarketingPageSlug } from "@/data/marketingPageTypes";

const BY_SLUG: Record<MarketingPageSlug, MarketingPageHeroConfig> = {
  compare: {
    imageUrl: compareHeroBanner,
    width: 3840,
    height: 2160,
    alt: "VinFast VF 6, VF 7, Limo Green and VF MPV 7 lineup at sunset",
    imageFit: "cover",
    objectPosition: "center 55%",
  },
  "test-drive": {
    imageUrl: testDriveHeroBanner,
    width: 3840,
    height: 2160,
    alt: "VinFast electric SUVs at sunset — book your test drive",
    imageFit: "cover",
    objectPosition: "center 45%",
  },
  "emi-calculator": {
    imageUrl: emiHeroBanner,
    width: 3840,
    height: 2160,
    alt: "VinFast electric vehicles — EMI calculator",
    imageFit: "cover",
    objectPosition: "center center",
  },
  about: {
    imageUrl: patliputraShowroomHero,
    width: 3840,
    height: 2160,
    alt: "Patliputra VinFast — VinFast Patna showroom",
    imageFit: "cover",
    objectPosition: "center center",
  },
  contact: {
    imageUrl: patliputraShowroomHero,
    width: 3840,
    height: 2160,
    alt: "Patliputra VinFast — visit our Patna showroom",
    imageFit: "cover",
    objectPosition: "center center",
  },
};

export function getDefaultMarketingPageHero(slug: MarketingPageSlug): MarketingPageHeroConfig {
  return { ...BY_SLUG[slug] };
}

export function getDefaultMarketingPageContent(slug: MarketingPageSlug) {
  return { slug, hero: getDefaultMarketingPageHero(slug) };
}
