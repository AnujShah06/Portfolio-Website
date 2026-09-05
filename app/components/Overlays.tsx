"use client";

import { useEffect, useRef } from "react";
import s from "./fx.module.css";

/** Blueprint grid revealed in a circle around the cursor. */
export function GridOverlay() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      el.style.setProperty("--gx", `${e.clientX}px`);
      el.style.setProperty("--gy", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={ref} className={s.gridOverlay} aria-hidden="true" />;
}

/** Sweeping PPI scope — the payoff for typing `radar`. */
export function RadarSweep() {
  return (
    <div className={s.radar} aria-hidden="true">
      <div className={s.radarDisc}>
        <div className={s.radarSweep} />
      </div>
    </div>
  );
}

/**
 * Watches for a typed word anywhere on the page and fires a callback.
 * Buffer resets after a second of no typing.
 */
export function useTypedCode(code: string, onHit: () => void) {
  useEffect(() => {
    let buf = "";
    let timer = 0;

    const onKey = (e: KeyboardEvent) => {
      const inField =
        e.target instanceof HTMLElement &&
        /^(input|textarea|select)$/i.test(e.target.tagName);
      if (inField || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;

      buf = (buf + e.key.toLowerCase()).slice(-code.length);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        buf = "";
      }, 1000);

      if (buf === code) {
        buf = "";
        onHit();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [code, onHit]);
}
