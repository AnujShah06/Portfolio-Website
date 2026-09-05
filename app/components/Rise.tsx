"use client";

import s from "./fx.module.css";
import { useInViewOnce } from "./hooks";

/** Staggered blur-up reveal for list items and grid cells. */
export default function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`${s.riseItem} ${inView ? s.riseIn : ""} ${className}`}
      style={{ ["--rise-delay" as any]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
