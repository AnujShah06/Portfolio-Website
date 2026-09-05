"use client";

import s from "./fx.module.css";

export type SpineSection = { id: string; label: string };

/** Vertical HUD rail on the right edge showing which section is in view. */
export default function SectionSpine({
  sections,
  active,
}: {
  sections: SpineSection[];
  active: string;
}) {
  return (
    <nav className={s.spine} aria-label="Section rail">
      {sections.map((sec) => (
        <button
          key={sec.id}
          type="button"
          className={`${s.spineItem} ${s.mono} ${
            active === sec.id ? s.spineActive : ""
          }`}
          aria-current={active === sec.id ? "true" : undefined}
          onClick={() =>
            document
              .getElementById(sec.id)
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        >
          <span className={s.spineLabel}>{sec.label}</span>
          <span className={s.spineTick} aria-hidden="true" />
        </button>
      ))}
    </nav>
  );
}
