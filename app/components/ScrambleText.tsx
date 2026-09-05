"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInViewOnce, usePrefersReducedMotion } from "./hooks";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01xz$%&@";

type Trigger = "view" | "hover" | "mount";

/**
 * Decrypt-style text reveal: characters churn through random glyphs before
 * settling into the real string.
 */
export default function ScrambleText({
  text,
  trigger = "view",
  speed = 1,
  className,
  as: Tag = "span",
}: {
  text: string;
  trigger?: Trigger;
  speed?: number;
  className?: string;
  as?: any;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLSpanElement>({ threshold: 0.4 });
  const [out, setOut] = useState(trigger === "mount" ? "" : text);
  const rafRef = useRef(0);
  const runningRef = useRef(false);

  const run = useCallback(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    if (runningRef.current) return;
    runningRef.current = true;

    const chars = text.split("");
    const plan = chars.map((c, i) => ({
      c,
      start: Math.floor(i * 1.6 + Math.random() * 12),
      end: Math.floor(i * 1.6 + 14 + Math.random() * 22),
    }));
    const last = Math.max(...plan.map((p) => p.end), 1);

    let frame = 0;
    const tickFrame = () => {
      const t = frame * speed;
      let next = "";
      for (const p of plan) {
        if (t >= p.end) next += p.c;
        else if (t >= p.start && p.c !== " ")
          next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        else if (p.c === " ") next += " ";
        else next += "";
      }
      setOut(next);
      frame += 1;
      if (t < last) {
        rafRef.current = window.requestAnimationFrame(tickFrame);
      } else {
        setOut(text);
        runningRef.current = false;
      }
    };
    rafRef.current = window.requestAnimationFrame(tickFrame);
  }, [text, speed, reduced]);

  useEffect(() => {
    if (trigger === "mount") run();
  }, [trigger, run]);

  useEffect(() => {
    if (trigger === "view" && inView) run();
  }, [trigger, inView, run]);

  useEffect(() => () => window.cancelAnimationFrame(rafRef.current), []);

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseEnter={trigger === "hover" ? run : undefined}
      // keep layout stable while glyphs churn
      style={{ display: "inline-block" }}
    >
      {out || " "}
    </Tag>
  );
}
