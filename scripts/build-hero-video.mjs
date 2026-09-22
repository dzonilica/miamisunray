/*
 * Hero film build.
 *
 * Takes the editing master in the project root and writes the files the site
 * actually ships: a 1080p pair for desktop and a 720p pair for phones, each as
 * WebM (VP9) with an MP4 (H.264) beside it, plus the poster frame.
 *
 *   node scripts/build-hero-video.mjs             rebuild from hero.mp4
 *   node scripts/build-hero-video.mjs other.mp4   rebuild from another master
 *
 * The film sits behind a veil and is always in motion, so it is encoded for
 * weight rather than for stills: no audio track, a two second keyframe interval
 * so the loop restarts without a stall, and faststart so playback can begin
 * before the file has finished downloading.
 *
 * Needs ffmpeg on PATH. Run scripts/build-media.mjs afterwards to rebuild the
 * poster's WebP and AVIF variants.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { stat } from "node:fs/promises";
import path from "node:path";

const run = promisify(execFile);
const master = path.resolve(process.argv[2] ?? "hero.mp4");
const OUT = path.resolve("public/media");

/*
 * The rates are tuned against this footage — an aerial drone pass, where the
 * constant camera motion over grass and gravel is what costs bitrate, not the
 * subject. Tested frame by frame against the master: at these values the
 * difference is confined to the texture of the grass, which sits under the
 * veil and behind moving type. Re-check them if the footage ever changes to
 * something slower or flatter.
 */
const RENDITIONS = [
  { name: "hero-loop", width: 1920, mp4Crf: 33, webmCrf: 48 },
  { name: "hero-loop-720", width: 1280, mp4Crf: 31, webmCrf: 50 },
];

const scale = (width) => `scale=${width}:-2:flags=lanczos`;

async function mp4({ name, width, mp4Crf }) {
  const out = path.join(OUT, `${name}.mp4`);
  await run("ffmpeg", [
    "-v", "error", "-y", "-i", master,
    "-an", "-vf", scale(width),
    "-c:v", "libx264", "-profile:v", "high", "-preset", "slow",
    "-crf", String(mp4Crf), "-pix_fmt", "yuv420p",
    "-g", "60", "-keyint_min", "60", "-sc_threshold", "0",
    "-movflags", "+faststart", out,
  ]);
  return out;
}

async function webm({ name, width, webmCrf }) {
  const out = path.join(OUT, `${name}.webm`);
  await run("ffmpeg", [
    "-v", "error", "-y", "-i", master,
    "-an", "-vf", scale(width),
    "-c:v", "libvpx-vp9", "-crf", String(webmCrf), "-b:v", "0",
    "-row-mt", "1", "-deadline", "good", "-cpu-used", "3",
    "-pix_fmt", "yuv420p", "-g", "60",
    out,
  ]);
  return out;
}

async function poster() {
  const out = path.join(OUT, "hero-poster.jpg");
  // One second in: the first frame of a fade-in is usually black.
  await run("ffmpeg", [
    "-v", "error", "-y", "-ss", "1", "-i", master,
    "-frames:v", "1", "-vf", scale(1920), "-q:v", "3", out,
  ]);
  return out;
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

const masterSize = (await stat(master)).size;
console.log(`master: ${path.basename(master)}  ${kb(masterSize)}`);

for (const rendition of RENDITIONS) {
  for (const build of [webm, mp4]) {
    const out = await build(rendition);
    console.log(`  ${path.basename(out).padEnd(20)} ${kb((await stat(out)).size)}`);
  }
}

const still = await poster();
console.log(`  ${path.basename(still).padEnd(20)} ${kb((await stat(still)).size)}`);
