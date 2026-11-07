import type { ModelPageColorShade, ModelPageSlug } from "@/data/modelPageGalleryTypes";
import vf6InfinityBlanc from "@/assets/vf6-infinity-blanc.png";
import vf6CrimsonRed from "@/assets/vf6-crimson-red.png";
import vf6JetBlack from "@/assets/vf6-jet-black.png";
import vf6DesatSilver from "@/assets/vf6-desat-silver.png";
import vf6ZenithGrey from "@/assets/vf6-zenith-grey.png";
import vf6MoonlitOcean from "@/assets/vf6-moonlit-ocean.jpg";
import vf6IvyGreen from "@/assets/vf6-ivy-green.jpg";
import vf7InfinityBlanc from "@/assets/vf7-infinity-blanc.png";
import vf7CrimsonRed from "@/assets/vf7-crimson-red.png";
import vf7JetBlack from "@/assets/vf7-jet-black.png";
import vf7DesatSilver from "@/assets/vf7-desat-silver.png";
import vf7ZenithGrey from "@/assets/vf7-zenith-grey.png";
import vf7MoonlitOcean from "@/assets/vf7-moonlit-ocean.jpg";
import vf7IvyGreen from "@/assets/vf7-ivy-green.jpg";

const VF6_INTRO =
  "Infinity Blanc, Crimson Red, Jet Black, Desert Silver, Zenith Grey, Moonlit Ocean, Ivy Green.";

const VF7_INTRO = VF6_INTRO;

const VF6_SHADES: ModelPageColorShade[] = [
  { name: "Infinity Blanc", hex: "#E8E8E4", imageUrl: vf6InfinityBlanc, alt: "VinFast VF 6 in Infinity Blanc", order: 0, active: true },
  { name: "Crimson Red", hex: "#C80F1E", imageUrl: vf6CrimsonRed, alt: "VinFast VF 6 in Crimson Red", order: 1, active: true },
  { name: "Jet Black", hex: "#18191D", imageUrl: vf6JetBlack, alt: "VinFast VF 6 in Jet Black", order: 2, active: true },
  { name: "Desert Silver", hex: "#C8C9C4", imageUrl: vf6DesatSilver, alt: "VinFast VF 6 in Desert Silver", order: 3, active: true },
  { name: "Zenith Grey", hex: "#61656B", imageUrl: vf6ZenithGrey, alt: "VinFast VF 6 in Zenith Grey", order: 4, active: true },
  { name: "Moonlit Ocean", hex: "#1E4A7A", imageUrl: vf6MoonlitOcean, alt: "VinFast VF 6 in Moonlit Ocean", order: 5, active: true },
  { name: "Ivy Green", hex: "#1F3D2E", imageUrl: vf6IvyGreen, alt: "VinFast VF 6 in Ivy Green", order: 6, active: true },
];

const VF7_SHADES: ModelPageColorShade[] = [
  { name: "Infinity Blanc", hex: "#E6E6E2", imageUrl: vf7InfinityBlanc, alt: "VinFast VF 7 in Infinity Blanc", order: 0, active: true },
  { name: "Crimson Red", hex: "#C80F1E", imageUrl: vf7CrimsonRed, alt: "VinFast VF 7 in Crimson Red", order: 1, active: true },
  { name: "Jet Black", hex: "#18191D", imageUrl: vf7JetBlack, alt: "VinFast VF 7 in Jet Black", order: 2, active: true },
  { name: "Desert Silver", hex: "#D8D9D4", imageUrl: vf7DesatSilver, alt: "VinFast VF 7 in Desert Silver", order: 3, active: true },
  { name: "Zenith Grey", hex: "#61656B", imageUrl: vf7ZenithGrey, alt: "VinFast VF 7 in Zenith Grey", order: 4, active: true },
  { name: "Moonlit Ocean", hex: "#1E4A7A", imageUrl: vf7MoonlitOcean, alt: "VinFast VF 7 in Moonlit Ocean", order: 5, active: true },
  { name: "Ivy Green", hex: "#1F3D2E", imageUrl: vf7IvyGreen, alt: "VinFast VF 7 in Ivy Green", order: 6, active: true },
];

export const MODEL_PAGES_WITH_COLOR_STUDIO: ModelPageSlug[] = ["vf6", "vf7"];

export function getDefaultColorStudioIntro(slug: ModelPageSlug): string {
  if (slug === "vf6") return VF6_INTRO;
  if (slug === "vf7") return VF7_INTRO;
  return "";
}

export function getDefaultColorShades(slug: ModelPageSlug): ModelPageColorShade[] {
  if (slug === "vf6") return VF6_SHADES.map((s) => ({ ...s }));
  if (slug === "vf7") return VF7_SHADES.map((s) => ({ ...s }));
  return [];
}

export function mapColorShadesForStudio(shades: ModelPageColorShade[]) {
  return shades
    .filter((s) => s.active !== false && s.imageUrl?.trim() && s.name?.trim())
    .sort((a, b) => a.order - b.order)
    .map((s) => ({
      name: s.name,
      hex: s.hex,
      image: s.imageUrl,
      alt: s.alt?.trim() || undefined,
    }));
}
