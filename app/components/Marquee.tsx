"use client";

import s from "./fx.module.css";

/** Infinite horizontal skill ticker. Pauses on hover. */
export default function Marquee({
  items,
  duration = 46,
  reverse = false,
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
}) {
  // duplicated once so the -50% keyframe loops seamlessly
  const doubled = [...items, ...items];

  return (
    <div
      className={`${s.marquee} ${reverse ? s.marqueeReverse : ""}`}
      style={{ ["--marquee-duration" as any]: `${duration}s` }}
      aria-hidden="true"
    >
      <div className={s.marqueeTrack}>
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className={s.marqueeChip}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
