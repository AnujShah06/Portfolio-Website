"use client";

import { useRef } from "react";
import s from "./fx.module.css";
import { usePrefersReducedMotion } from "./hooks";

/** Nudges its child toward the cursor while hovered, then springs back. */
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = usePrefersReducedMotion();

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.classList.add(s.magneticActive);
    el.style.transform = `translate3d(${(dx * strength).toFixed(1)}px, ${(
      dy * strength
    ).toFixed(1)}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove(s.magneticActive);
    el.style.transform = "";
  };

  return (
    <span
      ref={ref}
      className={`${s.magnetic} ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </span>
  );
}
