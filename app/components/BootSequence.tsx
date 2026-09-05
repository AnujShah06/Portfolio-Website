"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import s from "./fx.module.css";

const LINES: { text: string; ok: string }[] = [
  { text: "booting anuj.sys ........................", ok: "ok" },
  { text: "mounting /experience ....................", ok: "10 roles" },
  { text: "loading encoder weights .................", ok: "7420 img" },
  { text: "indexing document corpus ................", ok: "13k docs" },
  { text: "clearance check .........................", ok: "SECRET" },
  { text: "establishing uplink .....................", ok: "live" },
];

const SEEN_KEY = "anuj.boot.v1";
const CHAR_MS = 7;
const LINE_GAP_MS = 90;

/**
 * Terminal-style cold boot shown once per browser session. Any click or
 * keypress skips it; it never runs under reduced motion.
 */
export default function BootSequence({ onDone }: { onDone?: () => void }) {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    window.setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      onDone?.();
    }, 640);
  }, [onDone]);

  // Decide whether to run at all.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      seen = false;
    }

    if (reduced || seen) {
      onDone?.();
      return;
    }

    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* private mode — just run it */
    }

    setShow(true);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [onDone]);

  // Type it out.
  useEffect(() => {
    if (!show || leaving) return;

    if (lineIdx >= LINES.length) {
      const t = window.setTimeout(finish, 380);
      return () => window.clearTimeout(t);
    }

    const line = LINES[lineIdx].text;
    if (charIdx < line.length) {
      const t = window.setTimeout(() => setCharIdx((c) => c + 1), CHAR_MS);
      return () => window.clearTimeout(t);
    }

    const t = window.setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, LINE_GAP_MS);
    return () => window.clearTimeout(t);
  }, [show, leaving, lineIdx, charIdx, finish]);

  // Skip on any interaction.
  useEffect(() => {
    if (!show) return;
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [show, finish]);

  if (!show) return null;

  const progress = Math.min(100, (lineIdx / LINES.length) * 100);

  return (
    <div
      className={`${s.boot} ${s.mono} ${leaving ? s.bootOut : ""}`}
      role="status"
      aria-label="Loading"
    >
      <div className={s.bootGlow} aria-hidden="true" />
      <div className={s.bootScan} aria-hidden="true" />

      <div className={s.bootInner}>
        {LINES.slice(0, lineIdx + 1).map((l, i) => {
          const complete = i < lineIdx;
          const text = complete ? l.text : l.text.slice(0, charIdx);
          return (
            <div key={l.text} className={s.bootLine}>
              <span className={s.bootCaret}>&gt;</span>
              <span className={s.bootText}>{text}</span>
              {complete ? <span className={s.bootOk}>[{l.ok}]</span> : null}
            </div>
          );
        })}

        <div className={s.bootBarTrack}>
          <div className={s.bootBarFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={s.bootSkip}>press any key to skip</div>
      </div>
    </div>
  );
}
