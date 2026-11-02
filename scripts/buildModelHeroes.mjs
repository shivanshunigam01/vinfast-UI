/**
 * Regenerate /public/model-heroes/*.jpg from best available sources (up to 3840px wide).
 * Requires ffmpeg on PATH. Run: node scripts/buildModelHeroes.mjs
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "model-heroes");
const MAX_WIDTH = 3840;

/** @type {{ input: string; out: string }[]} */
const jobs = [
  { input: path.join(root, "src", "assets", "share", "vf6-hero.jpg"), out: "vf6-hero.jpg" },
  { input: path.join(root, "src", "assets", "model-heroes", "vf7-hero-banner.jpg"), out: "vf7-hero.jpg" },
  {
    input: path.join(root, "src", "assets", "mpv7-gallery", "mpv7-hero-DgnLiUYF.png"),
    out: "mpv7-hero.jpg",
  },
];

/** Upscale or downscale to MAX_WIDTH so retina viewports get enough pixels. */
const vfFilter = `scale=${MAX_WIDTH}:-2:flags=lanczos,unsharp=5:5:0.35:5:5:0.0`;

fs.mkdirSync(outDir, { recursive: true });

for (const { input, out } of jobs) {
  const output = path.join(outDir, out);
  if (!fs.existsSync(input)) {
    console.warn("Skip (missing):", input);
    continue;
  }
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-hide_banner",
      "-loglevel",
      "error",
      "-i",
      input,
      "-vf",
      vfFilter,
      "-q:v",
      "1",
      "-pix_fmt",
      "yuvj420p",
      output,
    ],
    { stdio: "inherit" },
  );
  console.log("Wrote", out);
}
