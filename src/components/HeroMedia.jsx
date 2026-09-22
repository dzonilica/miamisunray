import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Pause, Play } from "@phosphor-icons/react";
import { imageSources } from "../media";
import { useIsNarrow } from "../hooks";

/*
 * Full-bleed hero film.
 *
 * The film runs continuously — on a phone as well as on a desktop — and puts
 * itself back in motion whenever the browser stops it on its own: a refused
 * autoplay, a backgrounded tab, an iOS low-power mode, a stall on a slow
 * connection. The only things that leave it stopped are the visitor's own two
 * choices: the pause control below, or an operating system set to reduced
 * motion or data saver, where the poster frame stands in instead.
 *
 * Weight is handled by the encode rather than by switching the film off: a
 * phone pulls the 720p pair and everything else the 1080p pair, WebM first with
 * an MP4 beside it (scripts/build-hero-video.mjs).
 */

const RENDITIONS = {
  wide: [
    { src: "/media/hero-loop.webm", type: "video/webm" },
    { src: "/media/hero-loop.mp4", type: "video/mp4" },
  ],
  narrow: [
    { src: "/media/hero-loop-720.webm", type: "video/webm" },
    { src: "/media/hero-loop-720.mp4", type: "video/mp4" },
  ],
};

/*
 * The <video poster> attribute takes one image and no srcset, so it gets the
 * 960px WebP rather than the 1.9k JPEG: it is on screen for the moment before
 * the first frame decodes, and index.html preloads this exact URL. The full
 * JPEG and its variants stay for the still fallback, where the picture is not
 * a placeholder but the hero itself.
 */
const VIDEO_POSTER = "/media/hero-poster-960.webp";

/*
 * Answered during the first render rather than in an effect afterwards. Deciding
 * later means the still is mounted and its file requested before the video
 * replaces it, which costs a whole wasted poster download on every visit.
 */
function filmAllowed() {
  if (typeof window === "undefined") return false;

  const connection =
    navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection?.saveData) return false;

  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroMedia({ poster = "/media/hero-poster.jpg" }) {
  const hostRef = useRef(null);
  const videoRef = useRef(null);
  /* Set only by the pause control. The watchdog below reads it so that putting
     the film back in motion never overrides a visitor who asked for stillness. */
  const stoppedByVisitor = useRef(false);
  const [enabled, setEnabled] = useState(filmAllowed);
  const [playing, setPlaying] = useState(false);
  const reduceMotion = useReducedMotion();
  const narrow = useIsNarrow();

  const { scrollYProgress } = useScroll({
    target: hostRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, narrow ? 1.1 : 1.28]);
  const shift = useTransform(scrollYProgress, [0, 1], ["0%", narrow ? "10%" : "24%"]);

  /* Re-answered only if the setting changes while the page is open. */
  useEffect(() => {
    setEnabled(reduceMotion ? false : filmAllowed());
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    /* A single play() call is not a guarantee: it is refused while the tab is
       in the background, refused under some autoplay policies until the page
       has been touched, and undone again by the browser on a stall. So the
       attempt is repeated on every event that marks a moment when playback
       could start. play() rejects harmlessly when it still cannot. */
    const resume = () => {
      if (stoppedByVisitor.current || !video.paused || document.hidden) return;
      video.play().catch(() => {});
    };

    const media = ["pause", "ended", "stalled", "suspend", "canplay", "loadeddata"];
    const page = ["visibilitychange", "pointerdown", "keydown", "touchstart"];

    media.forEach((event) => video.addEventListener(event, resume));
    page.forEach((event) => document.addEventListener(event, resume, { passive: true }));
    window.addEventListener("pageshow", resume);
    window.addEventListener("focus", resume);

    /* Scrolling the hero back into view is the other moment worth a retry:
       browsers throttle decoding for off-screen video and do not always pick it
       up again by themselves. */
    const observer = new IntersectionObserver(resume, { threshold: 0 });
    if (hostRef.current) observer.observe(hostRef.current);

    resume();

    return () => {
      media.forEach((event) => video.removeEventListener(event, resume));
      page.forEach((event) => document.removeEventListener(event, resume));
      window.removeEventListener("pageshow", resume);
      window.removeEventListener("focus", resume);
      observer.disconnect();
      video.pause();
    };
  }, [enabled, narrow]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      stoppedByVisitor.current = false;
      video.play().catch(() => setPlaying(false));
    } else {
      stoppedByVisitor.current = true;
      video.pause();
    }
  };

  const posterSources = imageSources(poster);
  const sources = RENDITIONS[narrow ? "narrow" : "wide"];

  return (
    <>
      <div ref={hostRef} className="hero__frame" aria-hidden="true">
        <motion.div
          className="hero__frame-inner"
          style={reduceMotion ? undefined : { scale, y: shift }}
        >
          {enabled ? (
            /* Keyed by rendition: a phone rotated into a tablet width needs the
               element rebuilt, since swapping <source> children on a live video
               changes nothing until it is reloaded. */
            <video
              key={narrow ? "narrow" : "wide"}
              id="hero-film"
              ref={videoRef}
              className="hero__image"
              poster={VIDEO_POSTER}
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              preload="auto"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              {sources.map((source) => (
                <source key={source.type} src={source.src} type={source.type} />
              ))}
            </video>
          ) : (
            <picture>
              {posterSources.map((source) => (
                <source
                  key={source.type}
                  type={source.type}
                  srcSet={source.srcSet}
                  sizes="100vw"
                />
              ))}
              <img
                className="hero__image"
                src={poster}
                alt=""
                sizes={posterSources.length ? "100vw" : undefined}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          )}
        </motion.div>
      </div>
      <span className="hero__veil" aria-hidden="true" />

      {enabled && (
        <button
          className="hero__film-toggle"
          type="button"
          onClick={toggle}
          aria-controls="hero-film"
          aria-label={playing ? "Pause background film" : "Play background film"}
        >
          {playing ? (
            <Pause size={13} weight="fill" aria-hidden="true" />
          ) : (
            <Play size={13} weight="fill" aria-hidden="true" />
          )}
          <span>{playing ? "Pause" : "Play"}</span>
        </button>
      )}
    </>
  );
}
