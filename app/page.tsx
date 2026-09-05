"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";
import fx from "./components/fx.module.css";
import {
  coursework,
  credentials,
  experience,
  gallery,
  hero,
  links,
  profile,
  projects,
  quotes,
  roles,
  skillGroups,
  skillTicker,
  statusChips,
  telemetry,
} from "./content";

import NeuralField from "./components/NeuralField";
import CursorGlow from "./components/CursorGlow";
import ScrollProgress from "./components/ScrollProgress";
import SectionSpine from "./components/SectionSpine";
import BootSequence from "./components/BootSequence";
import ScrambleText from "./components/ScrambleText";
import Tilt from "./components/Tilt";
import Magnetic from "./components/Magnetic";
import Counter from "./components/Counter";
import Marquee from "./components/Marquee";
import Rise from "./components/Rise";
import CommandPalette, { type Command } from "./components/CommandPalette";
import { GridOverlay, RadarSweep, useTypedCode } from "./components/Overlays";

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect(); // reveal once
          break;
        }
      }
    }, options ?? { threshold: 0.18, rootMargin: "0px 0px -18% 0px" });

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

/**
 * Marks the last section whose top has crossed a line a third of the way down
 * the viewport. Scroll position rather than intersection ratio, so the very
 * large gaps between sections can't hand the highlight to a taller neighbour.
 */
function useSectionSpy(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] ?? "home");

  useEffect(() => {
    let raf = 0;

    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.34;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }

      // at the very bottom nothing else can cross the line — pin to the last
      const atEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atEnd) current = sectionIds[sectionIds.length - 1];

      setActive(current);
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds]);

  return active;
}

/** Hologram portrait that leans toward the cursor. */
function HoloPortrait() {
  const src = "/portraits/holo3_cutout.png";
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      ty = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
    };

    const loop = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      el.style.setProperty("--px", `${(cx * 22).toFixed(2)}px`);
      el.style.setProperty("--py", `${(cy * 16).toFixed(2)}px`);
      el.style.setProperty("--rx", `${(-cy * 7).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(cx * 9).toFixed(2)}deg`);
      raf = window.requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = window.requestAnimationFrame(loop);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      className={styles.portraitWrap}
      style={{ ["--portraitMask" as any]: `url(${src})` }}
      aria-label="Hologram portrait"
    >
      <div className={styles.portraitTilt} ref={wrapRef}>
        <img
          className={styles.portraitImg}
          src={src}
          alt="Hologram portrait"
          loading="eager"
          decoding="async"
        />
        <div className={styles.portraitScan} aria-hidden="true" />
      </div>
    </div>
  );
}

function IconMail() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6.5h16v11H4v-11Z"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M5 7.5 12 13l7-5.5"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.5c-5.2 0-9.5 4.3-9.5 9.6 0 4.2 2.7 7.7 6.5 9 .5.1.7-.2.7-.5v-1.7c-2.6.6-3.2-1.1-3.2-1.1-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1.1 1.5 1.1.9 1.6 2.4 1.1 3 .9.1-.7.3-1.1.6-1.4-2.1-.2-4.3-1.1-4.3-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1a9.2 9.2 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.7 0 3.8-2.2 4.7-4.3 4.9.3.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 3.8-1.3 6.5-4.8 6.5-9 0-5.3-4.3-9.6-9.5-9.6Z"
        fill="rgba(255,255,255,0.85)"
      />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 9.2V19H3.9V9.2h2.7ZM5.25 3.8c.9 0 1.6.7 1.6 1.6S6.15 7 5.25 7s-1.6-.7-1.6-1.6.7-1.6 1.6-1.6ZM20.2 13.1V19h-2.7v-5.3c0-1.3-.5-2.2-1.7-2.2-1 0-1.5.7-1.8 1.3-.1.2-.1.6-.1.9V19H11.2s.04-9 0-9.8h2.7v1.4c.36-.56 1.01-1.36 2.46-1.36 1.8 0 3.14 1.2 3.14 3.9Z"
        fill="rgba(255,255,255,0.85)"
      />
    </svg>
  );
}

/** Cycles the role line, decoding each new one into place. */
function RoleRotator({ items }: { items: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = window.setInterval(
      () => setI((v) => (v + 1) % items.length),
      3000
    );
    return () => window.clearInterval(t);
  }, [items.length]);

  return (
    <div className={`${styles.roleLine} ${styles.mono}`} aria-live="polite">
      <span className={styles.roleBracket}>[</span>
      <ScrambleText
        key={i}
        text={items[i]}
        trigger="mount"
        className={styles.roleText}
      />
      <span className={styles.roleBracket}>]</span>
    </div>
  );
}

function QuotePill() {
  const items = useMemo(() => quotes, []);

  // Match even if smart quotes/apostrophes differ.
  const normalize = (s: string) =>
    (s ?? "")
      .trim()
      .replace(/[“”]/g, '"')
      .replace(/[’]/g, "'");

  const authorByQuote = useMemo<Record<string, string>>(
    () => ({
      [normalize("A lifetime of glory is worth a moment of pain.")]: "Laura Hillenbrand",
      [normalize("You’re free to make decisions but not free from the consequences.")]: "Ezra Taft Benson",
      [normalize("Justice is merely a construct of the current powerbase.")]: "Darth Maul",
      [normalize("The only history that is worth a tinker's damn is the history we make today.")]: "Henry Ford",
      [normalize("Eternal vigilance is the price of liberty")]: "Wendell Phillips",
    }),
    []
  );

  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % items.length);
  const prev = () => setI((v) => (v - 1 + items.length) % items.length);

  const author = authorByQuote[normalize(items[i])] ?? "";

  return (
    <div
      className={styles.quotePill}
      onClick={next}
      role="button"
      tabIndex={0}
      aria-label="Quote carousel"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") next();
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
    >
      <div className={styles.quoteLine}>“{items[i]}”</div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginTop: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <span className={styles.sep}>—</span>
          <div
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: 12,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            aria-label="Quote author"
          >
            {author}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            className={styles.quoteBtn}
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous quote"
            title="Previous"
          >
            {"<"}
          </button>
          <button
            className={`${styles.quoteBtn} ${styles.quoteBtnPrimary}`}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next quote"
            title="Next"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({
  id,
  navLabel,
  label,
  index,
  title,
  subtitle,
  children,
}: {
  id: string;
  navLabel: string;
  label: string;
  index: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const { ref, inView } = useInView<HTMLElement>({
    threshold: 0.14,
    rootMargin: "0px 0px -22% 0px",
  });

  return (
    <section id={id} ref={ref} className={styles.section} aria-label={navLabel}>
      <div className={`${styles.reveal} ${inView ? styles.inView : ""}`}>
        <div className={styles.h2Row}>
          <div className={styles.h2}>
            <ScrambleText text={label} trigger="view" />
          </div>
          <div className={styles.h2Rule} aria-hidden="true" />
          <div className={`${styles.h2Index} ${styles.mono}`} aria-hidden="true">
            {index}
          </div>
        </div>
        {title ? <div className={styles.h3}>{title}</div> : null}
        {subtitle ? <div className={styles.hint}>{subtitle}</div> : null}
        {children}
      </div>
    </section>
  );
}

const SECTIONS = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "experiences", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "credentials", label: "credentials" },
  { id: "gallery", label: "gallery" },
  { id: "contact", label: "contact" },
];

export default function Page() {
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), []);
  const active = useSectionSpy(sectionIds);

  /* ---------- interactive layer state ---------- */
  const [booted, setBooted] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [fieldOn, setFieldOn] = useState(true);
  const [cursorOn, setCursorOn] = useState(true);
  const [gridOn, setGridOn] = useState(false);
  const [radarOn, setRadarOn] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const say = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1900);
  }, []);

  const fireRadar = useCallback(() => {
    setRadarOn(true);
    say("radar sweep engaged");
    window.setTimeout(() => setRadarOn(false), 4800);
  }, [say]);

  useTypedCode("radar", fireRadar);

  const go = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* ---------- hero typewriter (waits for boot) ---------- */
  const fullGreeting = `${hero.greetingPrefix} ${hero.name} ${hero.greetingSuffix}`;
  const prefixLen = `${hero.greetingPrefix} `.length;
  const nameLen = hero.name.length;

  const [typedLen, setTypedLen] = useState(0);
  useEffect(() => {
    if (!booted) return;
    let idx = 0;
    const t = window.setInterval(() => {
      idx += 1;
      setTypedLen(idx);
      if (idx >= fullGreeting.length) window.clearInterval(t);
    }, 58);
    return () => window.clearInterval(t);
  }, [booted, fullGreeting.length]);

  const typedAll = fullGreeting.slice(0, typedLen);
  const typedPrefix = typedAll.slice(0, Math.min(prefixLen, typedAll.length));
  const typedName = typedAll.slice(prefixLen, Math.min(prefixLen + nameLen, typedAll.length));
  const typedSuffix = typedAll.slice(prefixLen + nameLen);

  const [activeExp, setActiveExp] = useState(0);
  const exp = experience[Math.max(0, Math.min(activeExp, experience.length - 1))];
  const expIsCurrent = /present/i.test(exp.time);

  const [activeProject, setActiveProject] = useState(0);
  const proj = projects[Math.max(0, Math.min(activeProject, projects.length - 1))];

  const [activeGallery, setActiveGallery] = useState(0);
  const gItem = gallery[Math.max(0, Math.min(activeGallery, gallery.length - 1))];

  /* ---------- command palette ---------- */
  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = SECTIONS.map((s) => ({
      id: `nav-${s.id}`,
      group: "navigate",
      label: s.label,
      icon: "→",
      keywords: s.id,
      run: () => go(s.id),
    }));

    const linkCmds: Command[] = [
      {
        id: "link-email",
        group: "links",
        label: "email anuj",
        icon: "@",
        keywords: "mail contact reach out",
        run: () => {
          window.location.href = links.email;
        },
      },
      {
        id: "link-copy",
        group: "links",
        label: "copy email address",
        icon: "⧉",
        keywords: "clipboard copy mail",
        run: async () => {
          try {
            await navigator.clipboard.writeText(
              links.email.replace("mailto:", "")
            );
            say("email copied to clipboard");
          } catch {
            say("clipboard blocked — sorry!");
          }
        },
      },
      {
        id: "link-github",
        group: "links",
        label: "open github",
        icon: "◈",
        keywords: "code repos source",
        run: () => window.open(links.github, "_blank", "noreferrer"),
      },
      {
        id: "link-linkedin",
        group: "links",
        label: "open linkedin",
        icon: "in",
        keywords: "profile network",
        run: () => window.open(links.linkedin, "_blank", "noreferrer"),
      },
    ];

    const systemCmds: Command[] = [
      {
        id: "fx-field",
        group: "system",
        label: `${fieldOn ? "disable" : "enable"} neural field`,
        icon: "◉",
        keywords: "particles background canvas performance",
        run: () => {
          setFieldOn((v) => !v);
          say(fieldOn ? "neural field off" : "neural field on");
        },
      },
      {
        id: "fx-cursor",
        group: "system",
        label: `${cursorOn ? "disable" : "enable"} cursor reticle`,
        icon: "✛",
        keywords: "pointer glow crosshair",
        run: () => {
          setCursorOn((v) => !v);
          say(cursorOn ? "reticle off" : "reticle on");
        },
      },
      {
        id: "fx-grid",
        group: "system",
        label: `${gridOn ? "hide" : "show"} blueprint grid`,
        icon: "▦",
        keywords: "wireframe overlay lines",
        run: () => {
          setGridOn((v) => !v);
        },
      },
      {
        id: "fx-radar",
        group: "system",
        label: "run radar sweep",
        icon: "◎",
        keywords: "ppi scope easter egg",
        hint: "type: radar",
        run: fireRadar,
      },
      {
        id: "fx-top",
        group: "system",
        label: "scroll to top",
        icon: "↑",
        keywords: "home start",
        run: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      },
    ];

    return [...nav, ...linkCmds, ...systemCmds];
  }, [go, say, fireRadar, fieldOn, cursorOn, gridOn]);

  return (
    <main className={styles.shell}>
      <div className={styles.bg} />
      <NeuralField enabled={fieldOn} />
      {gridOn ? <GridOverlay /> : null}
      {radarOn ? <RadarSweep /> : null}

      <ScrollProgress />
      <CursorGlow enabled={cursorOn} />
      <SectionSpine sections={SECTIONS} active={active} />
      <BootSequence onDone={() => setBooted(true)} />

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        commands={commands}
      />

      <button
        type="button"
        className={`${fx.kbdHint} ${fx.mono}`}
        onClick={() => setPaletteOpen(true)}
        aria-label="Open command palette"
      >
        <span className={fx.kbd}>⌘</span>
        <span className={fx.kbd}>K</span>
        <span>command palette</span>
      </button>

      {toast ? (
        <div className={`${styles.toast} ${styles.mono}`} role="status">
          {toast}
        </div>
      ) : null}

      <div className={styles.topbar}>
        <div className={styles.topbarFrame}>
          <div className={styles.topbarInner}>
            <Link href="#home" className={styles.brand} aria-label="Go to top">
              <div className={styles.dot} />
              <div className={styles.brandName}>Anuj Shah</div>
            </Link>

            <nav className={styles.nav} aria-label="Primary navigation">
              <Link href="#home" data-active={active === "home"}>Home</Link>
              <Link href="#about" data-active={active === "about"}>About</Link>
              <Link href="#experiences" data-active={active === "experiences"}>Experience</Link>
              <Link href="#projects" data-active={active === "projects"}>Projects</Link>
              <Link href="#credentials" data-active={active === "credentials"}>Credentials</Link>
              <Link href="#gallery" data-active={active === "gallery"}>Gallery</Link>
              <Link href="#contact" data-active={active === "contact"}>Contact</Link>
            </nav>

            <div className={styles.iconRow} aria-label="External links">
              <Magnetic strength={0.28}>
                <Link className={styles.iconBtn} href={links.email} aria-label="Email" title="Email">
                  <IconMail />
                </Link>
              </Magnetic>
              <Magnetic strength={0.28}>
                <Link className={styles.iconBtn} href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
                  <IconGitHub />
                </Link>
              </Magnetic>
              <Magnetic strength={0.28}>
                <Link className={styles.iconBtn} href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                  <IconLinkedIn />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.frame}>
        <header id="home" className={styles.hero}>
          <div className={styles.heroGrid}>
            <HoloPortrait />

            <div>
              <div className={styles.greeting}>
                <span>{typedPrefix}</span>
                <span className={styles.accent}>{typedName}</span>
                <span>{typedSuffix}</span>
                <span className={styles.cursor} />
              </div>

              <RoleRotator items={roles} />

              <div className={styles.heroIntro}>
                I’m a <span className={styles.accent}>Computer Science</span> student at Purdue
                building <span className={styles.accent}>machine learning systems</span> for the{" "}
                <span className={styles.accent}>defense</span> world — OSINT ingestion, hybrid
                retrieval, and decision-support models that hold up in production.
              </div>

              <div className={styles.heroSub}>
                This is my little corner of the internet — projects, experiments, research, and
                whatever I’m learning along the way.
              </div>

              <div className={styles.chips}>
                {statusChips.map((c) => (
                  <span
                    key={c.label}
                    className={`${styles.chip} ${
                      c.tone === "cyan"
                        ? styles.chipCyan
                        : c.tone === "green"
                        ? styles.chipGreen
                        : ""
                    }`}
                  >
                    <span className={styles.chipDot} aria-hidden="true" />
                    {c.label}
                  </span>
                ))}
              </div>

              <div className={styles.ctaRow}>
                <Magnetic strength={0.22}>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    onClick={() => go("experiences")}
                  >
                    see the work →
                  </button>
                </Magnetic>
                <Magnetic strength={0.22}>
                  <button
                    type="button"
                    className={styles.ghostBtn}
                    onClick={() => setPaletteOpen(true)}
                  >
                    <span className={fx.kbd}>⌘K</span> jump anywhere
                  </button>
                </Magnetic>
              </div>
            </div>
          </div>

          <div className={styles.telemetry} aria-label="Quick stats">
            {telemetry.map((t) => (
              <div key={t.label} className={styles.telItem}>
                <div className={styles.telValue}>
                  <Counter
                    value={t.value}
                    decimals={t.decimals}
                    suffix={t.suffix}
                  />
                </div>
                <div className={styles.telLabel}>{t.label}</div>
              </div>
            ))}
          </div>
        </header>

        <Section id="about" navLabel="About" label="/about_me" index="01">
          <div
            className={styles.aboutSplit}
            style={{
              marginTop: 16,
              gridTemplateColumns: "1.35fr 0.65fr",
              columnGap: 100,
            }}
          >
            {/* Glass panel: text only */}
            <div className={`${styles.panel} ${styles.aboutPanel}`} style={{ width: "100%", maxWidth: "unset" }}>
              <div style={{ color: "rgba(255,255,255,0.74)", lineHeight: 1.85, maxWidth: "78ch" }}>
                <p style={{ margin: 0 }}>
                  I’m an ML Systems Engineer Intern at a stealth defense market-intelligence
                  startup in Quantico, where I build OSINT ingestion and hybrid retrieval that
                  feeds an LLM judge.
                </p>
                <p style={{ margin: "12px 0 0 0" }}>
                  Before that I was an MLOps intern at U.S. Marine Corps Systems Command, taking
                  decision-support models from prototype to production on Databricks — and before
                  that, streaming live race telemetry through Kafka and Flink for a World Racing
                  League team.
                </p>
                <p style={{ margin: "12px 0 0 0" }}>
                  I’m in my junior year of a B.S. in Computer Science at Purdue. On the side I
                  train self-supervised energy models that judge whether an image actually holds
                  together.
                </p>

                <div
                  style={{
                    marginTop: 18,
                    paddingLeft: 12,
                    borderLeft: "3px solid rgba(86, 198, 255, 0.9)",
                    color: "rgba(255,255,255,0.82)",
                  }}
                >
                  <span className={styles.accent}>The stack I reach for:</span>
                </div>

                <div className={styles.skillGrid}>
                  {skillGroups.map((g, i) => (
                    <Rise key={g.name} delay={i * 70}>
                      <div className={styles.skillGroup}>
                        <div className={`${styles.skillGroupName} ${styles.mono}`}>
                          {g.name}
                        </div>
                        <div className={styles.skillItems}>
                          {g.items.map((it) => (
                            <span key={it} className={styles.tag}>
                              {it}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Rise>
                  ))}
                </div>

                <p style={{ margin: "18px 0 0 0", color: "rgba(255,255,255,0.70)" }}>
                  Outside of work, you’ll usually find me hiking, playing anything that involves a
                  racket or paddle, and catching Steelers games. Oh! I&apos;m also an avid
                  mixologist.
                </p>
              </div>
            </div>

            {/* Image: on background (NOT inside the glass panel) */}
            <div className={styles.aboutPhotoWrap} aria-label="Portrait">
              <Tilt max={6} scale={1.02} className={styles.aboutPhotoTilt}>
                <img className={styles.aboutPhoto} src="/portraits/me.png" alt="Portrait" loading="lazy" decoding="async" />
              </Tilt>
            </div>
          </div>

          <div className={styles.skillMarquees}>
            <Marquee items={skillTicker} duration={52} />
            <Marquee items={[...skillTicker].reverse()} duration={62} reverse />
          </div>
        </Section>

        <Section id="experiences" navLabel="Experiences" label="/experiences" index="02">
          <div className={styles.expSplit}>
            <div className={styles.expIndex} aria-label="Experience index">
              {experience.map((e, idx) => (
                <button
                  key={`${e.role}-${idx}`}
                  className={`${styles.expItem} ${idx === activeExp ? styles.expItemActive : ""}`}
                  onClick={() => setActiveExp(idx)}
                >
                  <span className={`${styles.expNum} ${styles.mono}`}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.expOneLine}>{e.orglabel}</div>
                </button>
              ))}
            </div>

            <div className={styles.expDetail} aria-label="Experience details">
              {/* Animated wrapper: key changes every selection so the animation replays */}
              <div
                key={activeExp}
                style={{
                  animation: "expRevealFromDivider 950ms cubic-bezier(0.18, 0.9, 0.22, 1) both",
                  transformOrigin: "left center",
                  willChange: "transform, opacity, filter, clip-path",
                }}
              >
                <div className={styles.expHead}>
                  <div>
                    <div className={styles.expTitle}>{exp.role}</div>
                    <div className={styles.expOrgLine}>{exp.org}</div>
                  </div>
                  <div className={`${styles.expMeta} ${styles.mono}`}>
                    {expIsCurrent ? (
                      <span className={styles.expLive}>
                        <span className={styles.expLiveDot} aria-hidden="true" />
                        active
                      </span>
                    ) : null}
                    <span>
                      {exp.time}
                      {exp.location ? ` · ${exp.location}` : ""}
                    </span>
                  </div>
                </div>

                <div className={styles.hl}>
                  {exp.highlights.map((h, i) => {
                    const text = String(h).replace(/^→\s*/, "").replace(/^->\s*/, "");
                    return (
                      <div key={`${text}-${i}`} className={styles.hlItem}>
                        <span className={styles.hlIcon} aria-hidden="true">→</span>
                        <span className={styles.hlText}>{text}</span>
                      </div>
                    );
                  })}
                </div>

                <div className={styles.tags}>
                  {exp.stack.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>

                {exp.links?.length ? (
                  <div style={{ marginTop: 10, display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {exp.links.map((l: { href: string; label: string }) => (
                      <Link key={l.href} href={l.href} target="_blank" rel="noreferrer" className={styles.inlineLink}>
                        {l.label} →
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Section>

        <Section id="projects" navLabel="Projects" label="/projects" index="03">
          <div className={styles.projShelf}>
            <div className={styles.projRail} aria-label="Project shelf">
              {projects.map((p, idx) => (
                <Tilt
                  key={p.title}
                  max={8}
                  scale={1.02}
                  className={styles.projCard}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select project: ${p.title}`}
                  onClick={() => setActiveProject(idx)}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") setActiveProject(idx);
                  }}
                >
                  <div className={styles.projTitle}>{p.title}</div>
                  <div className={styles.projDesc}>{p.desc}</div>
                  <div className={styles.tags}>
                    {p.tags.map((t) => (
                      <span key={t} className={styles.tag}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className={styles.projOpenHint}>{idx === activeProject ? "selected" : "click"}</div>
                </Tilt>
              ))}
            </div>

            <div className={styles.projDetail} aria-label="Selected project details">
              <div className={styles.expTitle} style={{ fontSize: 18 }}>
                {proj.title}
              </div>
              <div className={styles.expSummary} style={{ marginTop: 10 }}>
                {proj.desc}
              </div>

              <div className={styles.bullets}>
                {proj.bullets.map((b) => (
                  <div key={b} className={styles.bullet}>
                    {b}
                  </div>
                ))}
              </div>

              <div className={styles.tags}>
                {proj.tags.map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>

              {proj.link ? (
                <Link className={styles.inlineLink} href={proj.link.href} target="_blank" rel="noreferrer">
                  {proj.link.label} →
                </Link>
              ) : null}
            </div>
          </div>
        </Section>

        <Section id="credentials" navLabel="Credentials" label="/credentials" index="04">
          <div className={styles.eduGrid}>
            <Rise>
              <div className={styles.eduCard}>
                <div className={styles.eduSchool}>{profile.school}</div>
                <div className={styles.eduDegree}>{profile.degree}</div>

                <div style={{ marginTop: 14 }}>
                  <div className={styles.eduRow}>
                    <span className={`${styles.eduKey} ${styles.mono}`}>graduation</span>
                    <span className={styles.eduVal}>{profile.grad}</span>
                  </div>
                  <div className={styles.eduRow}>
                    <span className={`${styles.eduKey} ${styles.mono}`}>gpa</span>
                    <span className={styles.eduVal}>{profile.gpa} / 4.00</span>
                  </div>
                  <div className={styles.eduRow}>
                    <span className={`${styles.eduKey} ${styles.mono}`}>location</span>
                    <span className={styles.eduVal}>{profile.location}</span>
                  </div>
                  <div className={styles.eduRow}>
                    <span className={`${styles.eduKey} ${styles.mono}`}>clearance</span>
                    <span className={styles.eduVal}>
                      {profile.clearance} · {profile.citizenship}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: 18 }}>
                  <div className={`${styles.skillGroupName} ${styles.mono}`}>
                    relevant coursework
                  </div>
                  <div className={styles.courseChips}>
                    {coursework.map((c) => (
                      <span key={c} className={styles.courseChip}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Rise>

            <div>
              <div className={`${styles.skillGroupName} ${styles.mono}`} style={{ marginBottom: 12 }}>
                awards · leadership · licenses
              </div>
              <div className={styles.credList}>
                {credentials.map((c, i) => (
                  <Rise key={c.title} delay={i * 80}>
                    <div className={styles.credItem}>
                      <span className={`${styles.credMark} ${styles.mono}`} aria-hidden="true">
                        ▸
                      </span>
                      <div>
                        <div className={styles.credTitle}>{c.title}</div>
                        <div className={styles.credDetail}>{c.detail}</div>
                      </div>
                    </div>
                  </Rise>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="gallery" navLabel="Gallery" label="/film_strip" index="05">
          <div className={styles.gallerySplit} aria-label="Gallery">
            {/* Left: big preview */}
            <div className={styles.galleryPreview} aria-label={`Preview: ${gItem.title}`}>
              <img
                key={gItem.src}
                className={styles.galleryPreviewImg}
                src={gItem.src}
                alt={gItem.title}
                loading="lazy"
                decoding="async"
              />
              <div className={styles.galleryPreviewLabel}>{gItem.title}</div>
            </div>

            {/* Right: 4 x N grid */}
            <div className={styles.galleryGrid} aria-label="Gallery thumbnails grid">
              {gallery.map((g, idx) => (
                <button
                  key={g.title}
                  type="button"
                  className={`${styles.galleryThumb} ${idx === activeGallery ? styles.galleryThumbActive : ""}`}
                  onMouseEnter={() => setActiveGallery(idx)}
                  onFocus={() => setActiveGallery(idx)}
                  onClick={() => setActiveGallery(idx)}
                  aria-label={`Preview ${g.title}`}
                  aria-current={idx === activeGallery ? "true" : undefined}
                >
                  <img
                    className={styles.galleryThumbImg}
                    src={g.src}
                    alt={g.title}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>
        </Section>

        <Section id="contact" navLabel="Contact" label="/say_hi!" index="06">
          <div className={styles.contactStack}>
            <div className={styles.contactWide}>
              <div>
                <div className={styles.contactEmail}>anujshah7567@gmail.com</div>
                <div className={styles.contactNote}>
                  {profile.objective} Also reachable at shah1054@purdue.edu — I&apos;ll reply
                  when I can.
                </div>
              </div>

              <div className={styles.contactActions}>
                <Magnetic strength={0.25}>
                  <Link className={styles.pillBtn} href={links.email}>Email</Link>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Link className={styles.pillBtn} href={links.github} target="_blank" rel="noreferrer">GitHub</Link>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Link className={styles.pillBtn} href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</Link>
                </Magnetic>
              </div>
            </div>

            <div style={{ marginBottom: 200 }}>
              <QuotePill />
            </div>
          </div>
        </Section>

        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Anuj · try typing “radar”</span>
        </footer>
      </div>

      {/* Keyframes injected here so the experience panel animation stays with the markup */}
      <style jsx global>{`
        @keyframes expRevealFromDivider {
          0% {
            opacity: 0;
            transform: translateX(-32px);
            filter: blur(10px);
            clip-path: inset(0 100% 0 0);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
            filter: blur(0);
            clip-path: inset(0 0 0 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [style*="expRevealFromDivider"] {
            animation: none !important;
            clip-path: none !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </main>
  );
}
