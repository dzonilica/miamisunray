import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/*
 * A trailing ring that widens over anything clickable. The system cursor stays
 * visible underneath, so nothing about pointing at the page changes.
 */
export default function Cursor() {
  const ringRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    const ring = ringRef.current;
    if (!ring) return undefined;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let frame = 0;

    const handleMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      ring.dataset.visible = "true";

      const interactive = event.target.closest?.(
        'a, button, input, select, textarea, label, [role="button"]',
      );
      ring.dataset.active = interactive ? "true" : "false";
    };

    const handleLeave = () => {
      ring.dataset.visible = "false";
    };

    const render = () => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerleave", handleLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return <span className="cursor-ring" ref={ringRef} aria-hidden="true" data-visible="false" />;
}
