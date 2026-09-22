import { useEffect, useRef, useState } from "react";
import { CaretLeft, X } from "@phosphor-icons/react";
import { serviceGroups } from "../data";
import { useIsNarrow } from "../hooks";

/*
 * Index for the services page.
 *
 * On the wide layout it is a sticky rail in the left column, marking the card
 * currently being read so the list always says where you are.
 *
 * A phone has no column to spare, so the rail leaves the page and becomes a
 * layer over it: a tab the width of a thumb, tucked against the right edge
 * like a page marker, with the read-so-far line down its spine. Tapping it
 * drops the same grouped list out of the edge. Nothing of it sits in the
 * flow, so the cards keep the full width of the screen.
 */

const flatServices = serviceGroups.flatMap((group) =>
  group.items.map((service) => ({ slug: service.slug, name: service.name, group: group.name })),
);

function pad(value) {
  return String(value).padStart(2, "0");
}

export default function ServiceQuickBar() {
  const [active, setActive] = useState(flatServices[0].slug);
  const [showing, setShowing] = useState(false);
  const [open, setOpen] = useState(false);
  const narrow = useIsNarrow();
  const listRef = useRef(null);
  const sheetRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const cards = [...document.querySelectorAll("[data-service]")];
    const list = document.querySelector(".services-body");
    if (!cards.length || !list) return undefined;

    /* The card being read is the last one whose top has crossed a quarter of
       the way down the viewport. Measured rather than observed: a group
       heading between two cards, or a jump that lands in one, leaves an
       intersection band empty and the rail pointing at the wrong service. */
    let frame = 0;

    const measure = () => {
      frame = 0;
      const height = window.innerHeight;
      const line = height * 0.25;

      let current = cards[0];
      for (const card of cards) {
        if (card.getBoundingClientRect().top > line) break;
        current = card;
      }
      setActive(current.dataset.service);

      // The marker belongs to the list, not to the page: it comes in off the
      // edge as the cards arrive and leaves once they are behind you, rather
      // than sitting over the hero and the closing pitch.
      const bounds = list.getBoundingClientRect();
      setShowing(bounds.top < height * 0.72 && bounds.bottom > height * 0.2);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Widening the window back to the rail layout leaves nothing to unfold.
  useEffect(() => {
    if (!narrow) setOpen(false);
  }, [narrow]);

  useEffect(() => {
    if (!open) return undefined;

    // The list is scrolled directly rather than through scrollIntoView, which
    // would take the page with it and move the section being read.
    const list = listRef.current;
    const reading = list?.querySelector('[data-active="true"]');
    if (list && reading) {
      list.scrollTop = reading.offsetTop - list.clientHeight / 2 + reading.offsetHeight / 2;
    }

    const previousFocus = document.activeElement;
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !sheetRef.current) return;

      const focusable = [
        ...sheetRef.current.querySelectorAll('a[href], button:not([disabled])'),
      ];
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

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus?.();
    };
  }, [open]);

  const index = Math.max(
    0,
    flatServices.findIndex((service) => service.slug === active),
  );
  const current = flatServices[index];
  const progress = (index + 1) / flatServices.length;
  const folded = narrow && !open;

  return (
    <aside
      className="quickbar"
      aria-label="Service index"
      data-open={open ? "true" : "false"}
      data-showing={showing ? "true" : "false"}
    >
      <button
        className="quickbar__scrim"
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      <p className="quickbar__title">All services</p>

      {narrow && (
        <button
          className="quickbar__tab"
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`All services — reading ${current.name}, ${index + 1} of ${flatServices.length}`}
          aria-expanded={open}
          aria-controls="service-index"
        >
          <span className="quickbar__tab-track" aria-hidden="true">
            <span style={{ transform: `scaleY(${progress})` }} />
          </span>
          <span className="quickbar__tab-label">All services</span>
          <CaretLeft className="quickbar__tab-glyph" size={13} weight="bold" aria-hidden="true" />
        </button>
      )}

      <div
        className="quickbar__sheet"
        id="service-index"
        ref={sheetRef}
        role={narrow ? "dialog" : undefined}
        aria-modal={narrow && open ? "true" : undefined}
        aria-label={narrow ? "All services" : undefined}
        aria-hidden={folded ? "true" : undefined}
        inert={folded || undefined}
      >
        {narrow && (
          <div className="quickbar__sheet-head">
            <p className="quickbar__sheet-title">All services</p>
            <span className="quickbar__sheet-count">
              {pad(index + 1)} / {pad(flatServices.length)}
            </span>
            <button
              ref={closeRef}
              className="quickbar__close"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close the service index"
            >
              <X size={15} weight="regular" aria-hidden="true" />
            </button>
          </div>
        )}

        <nav className="quickbar__scroll" ref={listRef}>
          {serviceGroups.map((group) => (
            <div className="quickbar__group" key={group.name}>
              <p className="quickbar__group-name">{group.name}</p>
              {group.items.map((service) => (
                <a
                  key={service.slug}
                  href={`#${service.slug}`}
                  className="quickbar__link"
                  data-active={service.slug === active ? "true" : "false"}
                  aria-current={service.slug === active ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="quickbar__dash" aria-hidden="true" />
                  {service.name}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <a className="quickbar__cta" href="/contact" onClick={() => setOpen(false)}>
          Request a quote
        </a>
      </div>
    </aside>
  );
}
