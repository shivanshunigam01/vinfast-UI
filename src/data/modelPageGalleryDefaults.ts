import type { ModelPageFeatureItem, ModelPageGalleryContent, ModelPageSlug } from "@/data/modelPageGalleryTypes";

import vf6GalExterior1 from "@/assets/vf6-gallery/vf6-gallery-exterior-1.jpg";
import vf6GalExterior2 from "@/assets/vf6-gallery/vf6-gallery-exterior-2.jpg";
import vf6GalDetail01 from "@/assets/vf6-gallery/vf6-gallery-detail-01.png";
import vf6GalDetail02 from "@/assets/vf6-gallery/vf6-gallery-detail-02.png";
import vf6GalDetail03 from "@/assets/vf6-gallery/vf6-gallery-detail-03.png";
import vf6GalDetail04 from "@/assets/vf6-gallery/vf6-gallery-detail-04.png";
import vf6GalDetail05 from "@/assets/vf6-gallery/vf6-gallery-detail-05.png";

import vf7GalExteriorA from "@/assets/vf7-gallery/vf7-gallery-exterior-a.jpg";
import vf7GalExteriorB from "@/assets/vf7-gallery/vf7-gallery-exterior-b.jpg";
import vf7GalFrontThreeQuarter from "@/assets/vf7-gallery/vf7-gallery-front-three-quarter.jpg";
import vf7GalFrontView from "@/assets/vf7-gallery/vf7-gallery-front-view.jpg";
import vf7GalGrille from "@/assets/vf7-gallery/vf7-gallery-grille.jpg";
import vf7GalHeadlight from "@/assets/vf7-gallery/vf7-gallery-headlight.jpg";
import vf7GalWheel from "@/assets/vf7-gallery/vf7-gallery-wheel.jpg";
import vf7GalSideStep from "@/assets/vf7-gallery/vf7-gallery-side-step.jpg";
import vf7GalSideMirror from "@/assets/vf7-gallery/vf7-gallery-side-mirror.jpg";
import vf7GalIntEnh01 from "@/assets/vf7-gallery/vf7-gallery-interior-enhanced-01.jpg";
import vf7GalIntEnh02 from "@/assets/vf7-gallery/vf7-gallery-interior-enhanced-02.jpg";
import vf7GalIntEnh03 from "@/assets/vf7-gallery/vf7-gallery-interior-enhanced-03.jpg";
import vf7GalIntEnh04 from "@/assets/vf7-gallery/vf7-gallery-interior-enhanced-04.jpg";
import vf7GalIntEnh05 from "@/assets/vf7-gallery/vf7-gallery-interior-enhanced-05.jpg";
import vf7GalIntEnh06 from "@/assets/vf7-gallery/vf7-gallery-interior-enhanced-06.jpg";
import vf7GalIntEnh07 from "@/assets/vf7-gallery/vf7-gallery-interior-enhanced-07.jpg";
import vf7GalIntEnh08 from "@/assets/vf7-gallery/vf7-gallery-interior-enhanced-08.jpg";

import mpv7GalFront from "@/assets/mpv7-details/mpv7-dtl-front-three-quarter.jpg";
import mpv7GalOverview from "@/assets/mpv7-details/mpv7-dtl-overview-1.jpg";
import mpv7GalInterior from "@/assets/mpv7-details/mpv7-dtl-interior-1.jpg";
import mpv7GalSide from "@/assets/mpv7-details/mpv7-dtl-side-left.jpg";
import mpv7GalHeadlight from "@/assets/mpv7-details/mpv7-dtl-headlight.jpg";
import mpv7GalRear from "@/assets/mpv7-details/mpv7-dtl-rear.jpg";
import mpv7GalWheel from "@/assets/mpv7-details/mpv7-dtl-wheel.jpg";

import limoGreenIntro from "@/assets/limo-green/intro-car.webp";
import limoGreenDesign from "@/assets/limo-green/design-car.webp";
import limoGreenInterior from "@/assets/limo-green/interior-gallery.webp";
import limoGreenColorSilver from "@/assets/limo-green/color-silver.webp";

function feature(
  imageUrl: string,
  title: string,
  description: string,
  alt: string,
  layout: "wide" | "standard",
  order: number,
): ModelPageFeatureItem {
  return { imageUrl, title, description, alt, layout, order, active: true };
}

const VF6_DEFAULTS: ModelPageGalleryContent = {
  slug: "vf6",
  galleryLabel: "Gallery",
  galleryTitle: "VF 6 in detail",
  galleryIntro:
    "Real exterior and interior photography from the showroom — each shot is paired with short context so specifications and design cues stay easy to scan alongside the visuals.",
  features: [
    feature(
      vf6GalExterior1,
      "Sculpted for the city",
      "Compact SUV proportions with a confident stance — LED lighting and clean surfacing that reads premium from every angle you walk up to it.",
      "VinFast VF 6 exterior — dramatic three-quarter view",
      "wide",
      0,
    ),
    feature(
      vf6GalExterior2,
      "Designed to stand out",
      "Strong shoulder lines and balanced glass area give the VF 6 a modern silhouette that feels at home on Patna roads and open highways alike.",
      "VinFast VF 6 exterior — dynamic road presence",
      "wide",
      1,
    ),
    feature(
      vf6GalDetail01,
      "Driver-centric cabin",
      "Landscape touchscreen, D-cut steering with the VinFast V, and light upholstery with contrast stitching — clear ergonomics and a premium feel through the front row.",
      "VinFast VF 6 interior dashboard, steering wheel, and front seats",
      "standard",
      2,
    ),
    feature(
      vf6GalDetail02,
      "Sleek side profile",
      "Aerodynamic roofline and defined wheel arches — Wind and Wind Infinity wear 18\" machine-cut alloys; Earth uses refined 17\" silver alloys.",
      "VinFast VF 6 full side profile",
      "standard",
      3,
    ),
    feature(
      vf6GalDetail03,
      "Front fascia & lighting",
      "LED lighting, signature V-shaped DRL, and a confident front graphic — visibility and identity in one glance.",
      "VinFast VF 6 front three-quarter studio view",
      "standard",
      4,
    ),
    feature(
      vf6GalDetail04,
      "Signature road presence",
      "Bold VF 6 proportions on the road — the full-width V light signature and sculpted cladding read unmistakable from the three-quarter angle.",
      "VinFast VF 6 front three-quarter on open road with mountain backdrop",
      "standard",
      5,
    ),
    feature(
      vf6GalDetail05,
      "Electrified performance",
      "Panoramic roofline, motion-ready stance, and smart-tech positioning — Wind and Wind Infinity add full ADAS and connected features; confirm your exact trim at Patliputra VinFast.",
      "VinFast VF 6 dynamic front three-quarter on highway with motion blur",
      "standard",
      6,
    ),
  ],
};

const VF7_DEFAULTS: ModelPageGalleryContent = {
  slug: "vf7",
  galleryLabel: "Gallery",
  galleryTitle: "VF 7 in detail",
  galleryIntro:
    "Showroom photography for the VF 7 — exterior and cabin details with short context next to each image.",
  features: [
    feature(
      vf7GalExteriorA,
      "Presence in motion",
      "4550 mm length and a 2840 mm wheelbase give the VF 7 a commanding SUV stance on Patna streets and highway cruises alike.",
      "VinFast VF 7 exterior lifestyle shot",
      "wide",
      0,
    ),
    feature(
      vf7GalExteriorB,
      "Sculpted surfacing",
      "Clean shoulder lines, black or silver 19\" alloys, and signature V lighting front and rear keep the design unmistakably VinFast.",
      "VinFast VF 7 exterior detail",
      "wide",
      1,
    ),
    feature(
      vf7GalFrontThreeQuarter,
      "Front three-quarter",
      "LED projector headlamps with auto levelling and follow-me-home — paired with the brand’s V-shaped light signature.",
      "VF 7 front three-quarter view",
      "standard",
      2,
    ),
    feature(
      vf7GalFrontView,
      "Front view",
      "Confident grille graphic and full-width lighting cues; heated, memory ORVMs with reverse link on every trim.",
      "VF 7 front view",
      "standard",
      3,
    ),
    feature(
      vf7GalGrille,
      "V identity",
      "The central V motif anchors the fascia — keyless entry and smart welcome behaviour complement the look.",
      "VF 7 grille detail",
      "standard",
      4,
    ),
    feature(
      vf7GalHeadlight,
      "LED projector detail",
      "Crisp projector performance for night driving; DRL integration keeps the VF 7 visible in urban traffic.",
      "VF 7 headlamp close-up",
      "standard",
      5,
    ),
    feature(
      vf7GalWheel,
      "19\" alloys & rubber",
      "245/50 R19 on every variant — silver finish on Earth, black alloy from Wind through Sky Infinity.",
      "VF 7 wheel and tyre",
      "standard",
      6,
    ),
    feature(
      vf7GalSideStep,
      "Side profile",
      "Roof rails from Wind up (Earth without) — easier roof loading for family trips across Bihar.",
      "VF 7 side step and sill",
      "standard",
      7,
    ),
    feature(
      vf7GalSideMirror,
      "ORVM detail",
      "Power fold, heat, memory, auto dim and LED side indicators — standard across the VF 7 range.",
      "VF 7 side mirror",
      "standard",
      8,
    ),
    feature(
      vf7GalIntEnh01,
      "Cabin climate & air quality",
      "Automatic dual-zone HVAC with PM1.0 filtration and ionizer — fresh air for every row on Patna commutes and highway runs.",
      "VinFast VF 7 interior — climate and cabin air",
      "standard",
      9,
    ),
    feature(
      vf7GalIntEnh02,
      "Steering & driver controls",
      "D-cut steering with vegan leather wrap, multi-function spokes and tilt/telescopic reach — keep eyes forward with HUD in view.",
      "VinFast VF 7 interior — steering wheel and controls",
      "standard",
      10,
    ),
    feature(
      vf7GalIntEnh03,
      "Driver-focused cockpit",
      "Clear sightlines, digital instrumentation and a minimalist IP — technology that stays intuitive at city speeds and on the open road.",
      "VinFast VF 7 interior — driver cockpit",
      "standard",
      11,
    ),
    feature(
      vf7GalIntEnh04,
      "Center console & storage",
      "Thoughtful stowage, piano-key drive logic and satin accents — daily usability with a premium feel across Earth through Sky Infinity.",
      "VinFast VF 7 interior — center console",
      "standard",
      12,
    ),
    feature(
      vf7GalIntEnh05,
      "Front-row comfort",
      "Powered adjustment (trim-dependent), supportive cushioning and refined materials — Wind upward adds ventilated front seats for Bihar summers.",
      "VinFast VF 7 interior — front seats",
      "standard",
      13,
    ),
    feature(
      vf7GalIntEnh06,
      "Rear passenger space",
      "2840 mm wheelbase pays off in legroom; rear vents and amenities keep family trips out of Patna comfortable.",
      "VinFast VF 7 interior — rear seating",
      "standard",
      14,
    ),
    feature(
      vf7GalIntEnh07,
      "Craft & detailing",
      "Contrast stitching, soft-touch surfaces and ambient touches that read upscale without shouting — showroom photography from Patliputra VinFast.",
      "VinFast VF 7 interior — trim and detail",
      "standard",
      15,
    ),
    feature(
      vf7GalIntEnh08,
      "32.76 cm touchscreen hub",
      "Navigation, media and connected services; Wind upward adds wireless Android Auto & Apple CarPlay, smart modes and OTA updates.",
      "VinFast VF 7 interior — infotainment display",
      "standard",
      16,
    ),
  ],
};

const MPV7_DEFAULTS: ModelPageGalleryContent = {
  slug: "mpv7",
  galleryLabel: "Gallery",
  galleryTitle: "VF MPV 7 in detail",
  galleryIntro:
    "Exterior presence and cabin comfort for India’s electric MPV — photography paired with short highlights so you can scan design and features at a glance.",
  features: [
    feature(
      mpv7GalFront,
      "Commanding front presence",
      "4740 mm length and confident SUV-MPV proportions — LED lighting and a sculpted fascia built for family road trips across Bihar.",
      "VinFast VF MPV 7 front three-quarter",
      "wide",
      0,
    ),
    feature(
      mpv7GalOverview,
      "Space for every journey",
      "2840 mm wheelbase and upright glasshouse — room for passengers and luggage without losing electric efficiency.",
      "VinFast VF MPV 7 exterior overview",
      "wide",
      1,
    ),
    feature(
      mpv7GalInterior,
      "Intentional interior",
      "Leatherette seating, thoughtful storage and a tech-forward cockpit — comfort curated for daily commutes and weekend getaways.",
      "VinFast VF MPV 7 interior",
      "standard",
      2,
    ),
    feature(
      mpv7GalSide,
      "Sculpted side profile",
      "Aerodynamic roofline, 19\" alloys and clean surfacing — MPV practicality with VinFast design DNA.",
      "VinFast VF MPV 7 side profile",
      "standard",
      3,
    ),
    feature(
      mpv7GalHeadlight,
      "LED lighting signature",
      "Crisp projector headlamps and DRL integration for visibility on Patna streets and open highways.",
      "VinFast VF MPV 7 headlight detail",
      "standard",
      4,
    ),
    feature(
      mpv7GalRear,
      "Rear design & utility",
      "Balanced tail graphic and practical loading height — family-ready from showroom to driveway.",
      "VinFast VF MPV 7 rear view",
      "standard",
      5,
    ),
    feature(
      mpv7GalWheel,
      "19\" wheels & stance",
      "235/50 R19 rubber and a planted stance — stable handling for an MPV-sized electric platform.",
      "VinFast VF MPV 7 wheel detail",
      "standard",
      6,
    ),
  ],
};

const LIMO_GREEN_DEFAULTS: ModelPageGalleryContent = {
  slug: "limo-green",
  galleryLabel: "Gallery",
  galleryTitle: "Limo Green in detail",
  galleryIntro:
    "Studio and showroom photography for the seven-seat Limo Green MPV — design, cabin, and colour as shown at Patliputra VinFast.",
  features: [
    feature(
      limoGreenIntro,
      "Business-ready presence",
      "A confident three-quarter view — practical electric MPV proportions with a modern VinFast face.",
      "VinFast Limo Green — rear three-quarter studio view",
      "wide",
      0,
    ),
    feature(
      limoGreenDesign,
      "Design that works",
      "Signature V-motif lighting and clean surfacing built for long days on Bihar roads.",
      "VinFast Limo Green — front three-quarter studio view",
      "wide",
      1,
    ),
    feature(
      limoGreenInterior,
      "Room for everyone",
      "2+3+2 seating, 10.1-inch touchscreen, and flexible load space for families and fleets.",
      "VinFast Limo Green interior — seven-seat cabin",
      "standard",
      2,
    ),
    feature(
      limoGreenColorSilver,
      "Desat Silver",
      "The launch colour on Limo Green — shown in side profile for a clear view of its stance.",
      "VinFast Limo Green in Desat Silver",
      "standard",
      3,
    ),
  ],
};

const BY_SLUG: Record<ModelPageSlug, ModelPageGalleryContent> = {
  vf6: VF6_DEFAULTS,
  vf7: VF7_DEFAULTS,
  mpv7: MPV7_DEFAULTS,
  "limo-green": LIMO_GREEN_DEFAULTS,
};

export function getDefaultModelPageGallery(slug: ModelPageSlug): ModelPageGalleryContent {
  const base = BY_SLUG[slug];
  return {
    ...base,
    features: base.features.map((f) => ({ ...f })),
  };
}

/** Deep copy for admin editor (no shared references). */
export function cloneModelPageGallery(content: ModelPageGalleryContent): ModelPageGalleryContent {
  return {
    ...content,
    features: content.features.map((f) => ({ ...f })),
  };
}
