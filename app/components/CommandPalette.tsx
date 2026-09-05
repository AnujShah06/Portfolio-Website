"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import s from "./fx.module.css";

export type Command = {
  id: string;
  group: string;
  label: string;
  icon?: string;
  hint?: string;
  keywords?: string;
  run: () => void;
};

/** Loose subsequence match, so "expr" still finds "experience". */
function matches(q: string, hay: string) {
  if (!q) return true;
  const needle = q.toLowerCase();
  const target = hay.toLowerCase();
  if (target.includes(needle)) return true;
  let i = 0;
  for (const ch of target) {
    if (ch === needle[i]) i += 1;
    if (i === needle.length) return true;
  }
  return false;
}

export default function CommandPalette({
  open,
  onOpenChange,
  commands,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  commands: Command[];
}) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(
    () =>
      commands.filter((c) =>
        matches(query, `${c.label} ${c.group} ${c.keywords ?? ""}`)
      ),
    [commands, query]
  );

  // Global ⌘K / Ctrl+K, plus "/" as a quick-open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const inField =
        e.target instanceof HTMLElement &&
        /^(input|textarea|select)$/i.test(e.target.tagName);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
        return;
      }
      if (!open && e.key === "/" && !inField) {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setCursor(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  // Keep the highlighted row visible.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-idx="${cursor}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor, open]);

  if (!open) return null;

  const runAt = (idx: number) => {
    const cmd = filtered[idx];
    if (!cmd) return;
    onOpenChange(false);
    // let the overlay unmount before scrolling / navigating
    window.setTimeout(() => cmd.run(), 10);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onOpenChange(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(filtered.length - 1, c + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(cursor);
    }
  };

  let lastGroup = "";

  return (
    <div
      className={s.paletteBackdrop}
      role="presentation"
      onClick={() => onOpenChange(false)}
    >
      <div
        className={s.palette}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className={s.paletteInputRow}>
          <span className={`${s.palettePrompt} ${s.mono}`}>&gt;_</span>
          <input
            ref={inputRef}
            className={s.paletteInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="jump to a section, open a link, flip a switch…"
            aria-label="Search commands"
            autoComplete="off"
            spellCheck={false}
          />
          <span className={s.kbd}>esc</span>
        </div>

        <div className={s.paletteList} ref={listRef}>
          {filtered.length === 0 ? (
            <div className={s.paletteEmpty}>no matches</div>
          ) : (
            filtered.map((c, i) => {
              const header = c.group !== lastGroup ? c.group : null;
              lastGroup = c.group;
              return (
                <div key={c.id}>
                  {header ? (
                    <div className={`${s.paletteGroup} ${s.mono}`}>{header}</div>
                  ) : null}
                  <button
                    type="button"
                    data-idx={i}
                    className={`${s.paletteItem} ${
                      i === cursor ? s.paletteItemActive : ""
                    }`}
                    onMouseEnter={() => setCursor(i)}
                    onClick={() => runAt(i)}
                  >
                    <span className={s.paletteIcon} aria-hidden="true">
                      {c.icon ?? "›"}
                    </span>
                    <span>{c.label}</span>
                    {c.hint ? (
                      <span className={`${s.paletteHintKey} ${s.mono}`}>
                        {c.hint}
                      </span>
                    ) : null}
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className={`${s.paletteFooter} ${s.mono}`}>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
