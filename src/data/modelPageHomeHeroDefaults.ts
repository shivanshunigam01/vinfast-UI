import type { ModelPageSlug } from "@/data/modelPageGalleryTypes";

export const MODEL_HOME_HERO_DEFAULTS: Record<
  ModelPageSlug,
  { title: string; subtitle: string; badge: string; order: number }
> = {
  vf6: {
    title: "VinFast VF 6",
    subtitle: "Built for a brighter tomorrow. Smart electric SUV — exclusively at Patliputra VinFast, Bihar.",
    badge: "Explore VF 6",
    order: 20,
  },
  vf7: {
    title: "VinFast VF 7",
    subtitle: "Born Sporty. Effortlessly Sophisticated. Bihar's favourite electric SUV.",
    badge: "Now Available",
    order: 21,
  },
  mpv7: {
    title: "VF MPV 7",
    subtitle: "Your World. On The Move. Seven-seat electric MPV from VinFast.",
    badge: "New launch",
    order: 22,
  },
};
