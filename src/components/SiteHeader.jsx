import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, EnvelopeSimple, InstagramLogo, Phone, X } from "@phosphor-icons/react";
import BrandMark from "./BrandMark";
import RollText from "./RollText";
import { useIntroDone } from "../intro";
import { lockScroll, unlockScroll } from "../scroll";
import { contact, legalNavigation, navigation } from "../data";

/*
 * Floating capsule navigation.
 *
 * One dark box does all the work: it draws itself in on load, stays pinned at
 * the top of the viewport for the whole scroll, and grows into the full menu in
 * place rather than handing over to a separate full-screen sheet. Width and height are animated
 * on the shell and its contents are clipped by it, so opening reads as the bar
 * unfolding and closing as it folding back up.
 */

const EASE = [0.165, 0.84, 0.44, 1];
const COLLAPSED_H = 58;

const menuLinks = [{ label: "Home", href: "/" }, ...navigation];

/* The bar states in order: nothing painted yet, sitting as a bar, gone because
   the panel has taken the box over. */
const barWrap = {
  boot: {},
  bar: { transition: { staggerChildren: 0.07, delayChildren: 0.34 } },
  away: { transition: { staggerChildren: 0.035, staggerDirection: -1 } },
};

const barPiece = {
  boot: { opacity: 0, y: 12 },
  bar: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  away: { opacity: 0, y: -12, transition: { duration: 0.22, ease: EASE } },
};

/* The two rules draw out from their own ends rather than fading, so the bar
   looks assembled instead of revealed. */
const barRule = {
  boot: { scaleX: 0, opacity: 0 },
  bar: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } },
  away: { scaleX: 0, opacity: 0, transition: { duration: 0.22, ease: EASE } },
};

const panelWrap = {
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.055, delayChildren: 0.2 } },
};

const panelPiece = {
  closed: { opacity: 0, y: 14, transition: { duration: 0.2, ease: EASE } },
  open: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* Big links roll up out of their own mask. */
const panelLink = {
  closed: { y: "110%", transition: { duration: 0.24, ease: EASE } },
  open: { y: "0%", transition: { duration: 0.72, ease: EASE } },
};

function labelFor(path) {
  const match = menuLinks.find((item) => item.href === path);
  return match ? match.label : "Menu";
}

/* The capsule is sized in pixels because its width is animated, and a CSS
   clamp() is not a value motion can interpolate. */
function measure() {
  const vw = typeof window === "undefined" ? 1280 : window.innerWidth;
  return {
    collapsed: Math.round(Math.min(Math.max(vw * 0.3, 264), 384)),
    expanded: Math.round(Math.min(vw - 28, 468)),
  };
}

export default function SiteHeader({ currentPath = "/" }) {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(measure);
  const reduceMotion = useReducedMotion();
  const ready = useIntroDone();
  const shellRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const onResize = () => setSize(measure());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousFocus = document.activeElement;
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !shellRef.current) return;

      const focusable = [
        ...shellRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
        closeRef.current,
      ].filter(Boolean);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    lockScroll();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      unlockScroll();
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [open]);

  const closeMenu = () => setOpen(false);
  const barState = !ready ? "boot" : open ? "away" : "bar";

  /* Before the loader lifts the box is a bare square; it stretches out to the
     bar width on the same beat the hero type arrives. */
  const shellWidth = !ready ? COLLAPSED_H : open ? size.expanded : size.collapsed;

  /* reducedMotion="user" lets the panel keep its opacity changes — which are
     what actually hide it inside the clipped box — while motion drops the
     transforms for anyone who asked for less movement. */
  return (
    <MotionConfig reducedMotion="user">
      <header
        className="navbar"
        data-open={open ? "true" : "false"}
      >
        <button
          className="navbar__scrim"
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={closeMenu}
        />

        <div className="navbar__stack">
          <motion.div
            ref={shellRef}
            className="navbar__shell"
            initial={
              reduceMotion ? false : { width: COLLAPSED_H, height: COLLAPSED_H, opacity: 0, y: -20 }
            }
            animate={{
              width: shellWidth,
              height: open ? "auto" : COLLAPSED_H,
              opacity: ready ? 1 : 0,
              y: ready ? 0 : -20,
            }}
            transition={{
              duration: reduceMotion ? 0 : open ? 0.64 : 0.78,
              delay: reduceMotion || ready ? 0 : 0.2,
              ease: EASE,
            }}
          >
            <motion.div
              className="navbar__bar"
              variants={barWrap}
              initial="boot"
              animate={barState}
              aria-hidden={open ? "true" : undefined}
              inert={open || undefined}
            >
              <motion.a
                className="navbar__brand"
                href="/"
                variants={barPiece}
                aria-label="Sunray Contracting home"
              >
                <BrandMark variant="light" />
              </motion.a>

              <motion.span className="navbar__label" variants={barPiece}>
                {labelFor(currentPath)}
              </motion.span>

              <motion.button
                className="navbar__burger"
                type="button"
                variants={barPiece}
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="site-menu"
              >
                <motion.span variants={barRule} aria-hidden="true" />
                <motion.span variants={barRule} aria-hidden="true" />
              </motion.button>
            </motion.div>

            <motion.div
              id="site-menu"
              className="navbar__panel"
              variants={panelWrap}
              initial="closed"
              animate={open ? "open" : "closed"}
              aria-hidden={open ? undefined : "true"}
              inert={!open || undefined}
            >
              <motion.p className="navbar__panel-label" variants={panelPiece}>
                Menu
              </motion.p>

              <nav className="navbar__links" aria-label="Site pages">
                {menuLinks.map((item) => (
                  <span className="navbar__mask" key={item.href}>
                    <motion.a
                      href={item.href}
                      onClick={closeMenu}
                      variants={panelLink}
                      aria-current={item.href === currentPath ? "page" : undefined}
                    >
                      {item.label}
                      <ArrowUpRight size={22} weight="light" aria-hidden="true" />
                    </motion.a>
                  </span>
                ))}
              </nav>

              <motion.div className="navbar__meta" variants={panelPiece}>
                <div className="navbar__meta-col">
                  {legalNavigation.map((item) => (
                    <a key={item.href} href={item.href} onClick={closeMenu}>
                      {item.label}
                    </a>
                  ))}
                  <a href={contact.instagramHref} target="_blank" rel="noreferrer">
                    <InstagramLogo size={15} weight="regular" aria-hidden="true" />
                    Instagram
                  </a>
                </div>
                <div className="navbar__meta-col">
                  <a href={contact.phoneHref}>
                    <Phone size={15} weight="regular" aria-hidden="true" />
                    {contact.phone}
                  </a>
                  <a href={contact.emailHref}>
                    <EnvelopeSimple size={15} weight="regular" aria-hidden="true" />
                    {contact.email}
                  </a>
                </div>
              </motion.div>

              <motion.a
                className="navbar__quote"
                href="/contact"
                onClick={closeMenu}
                variants={panelPiece}
              >
                <span className="navbar__quote-glyph" aria-hidden="true">
                  &#8618;
                </span>
                <RollText>Get a quote</RollText>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.button
            ref={closeRef}
            className="navbar__close"
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            initial={false}
            animate={
              open
                ? { opacity: 1, scale: 1, y: 0, rotate: 0 }
                : { opacity: 0, scale: 0.5, y: -14, rotate: -45 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: reduceMotion || !open ? 0 : 0.28,
              ease: EASE,
            }}
          >
            <X size={20} weight="regular" aria-hidden="true" />
          </motion.button>
        </div>
      </header>
    </MotionConfig>
  );
}
