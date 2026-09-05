"use client";

import { useRef } from "react";
import s from "./fx.module.css";
import { usePrefersReducedMotion } from "./hooks";

/**
 * Pointer-tracked 3D tilt with a light sheen that follows the cursor across
 * the card face.
 */
export default function Tilt({
  children,
  className = "",
  max = 7,
  scale = 1.015,
  sheen = true,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  sheen?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const sheenRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    el.classList.add(s.tiltActive);
    el.style.transform = `perspective(900px) rotateX(${((0.5 - py) * max).toFixed(
      2
    )}deg) rotateY(${((px - 0.5) * max).toFixed(2)}deg) scale(${scale})`;

    const sh = sheenRef.current;
    if (sh) {
      sh.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      sh.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      sh.classList.add(s.tiltSheenOn);
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove(s.tiltActive);
    el.style.transform = "";
    sheenRef.current?.classList.remove(s.tiltSheenOn);
  };

  return (
    <div
      {...rest}
      ref={ref}
      className={`${s.tilt} ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      {sheen ? (
        <div ref={sheenRef} className={s.tiltSheen} aria-hidden="true" />
      ) : null}
    </div>
  );
}
