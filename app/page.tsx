"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";
import { experience, gallery, hero, links, projects, quotes } from "./content";

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

function useSectionSpy(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] ?? "home");

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { threshold: [0.15, 0.25, 0.35, 0.45], rootMargin: "-20% 0px -65% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return active;
}

function HoloPortrait() {
  // Put this in: public/portraits/holo3_cutout.png
  const src = "/portraits/holo3_cutout.png";

  return (
    <div
      className={styles.portraitWrap}
      style={{ ["--portraitMask" as any]: `url(${src})` }}
      aria-label="Hologram portrait"
    >
      <img
        className={styles.portraitImg}
        src={src}
        alt="Hologram portrait"
        loading="eager"
        decoding="async"
      />
      <div className={styles.portraitScan} aria-hidden="true" />
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
  title,
  subtitle,
  children,
}: {
  id: string;
  navLabel: string;
  label: string;
  title: string;
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
        <div className={styles.h2}>{label}</div>
        <div className={styles.h3}>{title}</div>
        {subtitle ? <div className={styles.hint}>{subtitle}</div> : null}
        {children}
      </div>
    </section>
  );
}

export default function Page() {
  const sectionIds = ["home", "about", "experiences", "projects", "gallery", "contact"] as const;
  const active = useSectionSpy([...sectionIds]);

  const fullGreeting = `${hero.greetingPrefix} ${hero.name} ${hero.greetingSuffix}`;
  const prefixLen = `${hero.greetingPrefix} `.length;
  const nameLen = hero.name.length;

  const [typedLen, setTypedLen] = useState(0);
  useEffect(() => {
    let idx = 0;
    const t = window.setInterval(() => {
      idx += 1;
      setTypedLen(idx);
      if (idx >= fullGreeting.length) window.clearInterval(t);
    }, 58);
    return () => window.clearInterval(t);
  }, [fullGreeting.length]);

  const typedAll = fullGreeting.slice(0, typedLen);
  const typedPrefix = typedAll.slice(0, Math.min(prefixLen, typedAll.length));
  const typedName = typedAll.slice(prefixLen, Math.min(prefixLen + nameLen, typedAll.length));
  const typedSuffix = typedAll.slice(prefixLen + nameLen);

  const [activeExp, setActiveExp] = useState(0);
  const exp = experience[Math.max(0, Math.min(activeExp, experience.length - 1))];

  const [activeProject, setActiveProject] = useState(0);
  const proj = projects[Math.max(0, Math.min(activeProject, projects.length - 1))];

  const [activeGallery, setActiveGallery] = useState(0);
  const gItem = gallery[Math.max(0, Math.min(activeGallery, gallery.length - 1))];

  return (
    <main className={styles.shell}>
      <div className={styles.bg} />

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
              <Link href="#gallery" data-active={active === "gallery"}>Gallery</Link>
              <Link href="#contact" data-active={active === "contact"}>Contact</Link>
            </nav>

            <div className={styles.iconRow} aria-label="External links">
              <Link className={styles.iconBtn} href={links.email} aria-label="Email" title="Email">
                <IconMail />
              </Link>
              <Link className={styles.iconBtn} href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
                <IconGitHub />
              </Link>
              <Link className={styles.iconBtn} href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <IconLinkedIn />
              </Link>
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

              <div className={styles.heroIntro}>
                I’m a <span className={styles.accent}>Computer Science</span> student at Purdue University with a concentration in{" "}
                <span className={styles.accent}>Machine Learning</span>. I enjoy learning the problems different industries face and buliding{" "}
                <span className={styles.accent}>data-driven</span> solutions to try my best in solving them.
              </div>

              <div className={styles.heroSub}>
                This is my little corner of the internet - projects, experiments, certificates, and whatever I’m learning along the way.
              </div>
            </div>
          </div>
        </header>

        <Section id="about" navLabel="About" label="/about_me" title="" subtitle="">
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
                  I’m currently a ML Data Engineer at Team ACP Racing where I'm building a Python ETL pipeline to capture live data to conduct race strategy adjustments.
                </p>
                <p style={{ margin: "12px 0 0 0" }}>
                  I'm currently in my junior year pursuing my bachelors in Computer Science at Purdue University.
                </p>

                <div
                  style={{
                    marginTop: 14,
                    paddingLeft: 12,
                    borderLeft: "3px solid rgba(86, 198, 255, 0.9)",
                    color: "rgba(255,255,255,0.82)",
                  }}
                >
                  <span className={styles.accent}>Here are some technologies I work with often:</span>
                </div>

                <div
                  style={{
                    marginTop: 12,
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 12,
                    color: "rgba(255,255,255,0.72)",
                  }}
                >
                  <ul style={{ margin: 0, paddingLeft: 50, listStyle: "none" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                      <span className={styles.dot} aria-hidden="true" />
                      Python
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                      <span className={styles.dot} aria-hidden="true" />
                      Pandas / NumPy
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                      <span className={styles.dot} aria-hidden="true" />
                      scikit-learn
                    </li>
                  </ul>

                  <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                      <span className={styles.dot} aria-hidden="true" />
                      PyTorch
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                      <span className={styles.dot} aria-hidden="true" />
                      SQL
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                      <span className={styles.dot} aria-hidden="true" />
                      R
                    </li>
                  </ul>
                </div>

                <p style={{ margin: "14px 0 0 0", color: "rgba(255,255,255,0.70)" }}>
                  Outside of work, you’ll usually find me hiking, playing anything that involves a racket or paddle, and catching Steelers games. Oh! I'm also an avid mixologist.
                </p>
              </div>
            </div>

            {/* Image: on background (NOT inside the glass panel) */}
            <div className={styles.aboutPhotoWrap} aria-label="Portrait">
              <img className={styles.aboutPhoto} src="/portraits/me.png" alt="Portrait" loading="lazy" decoding="async" />
            </div>
          </div>
        </Section>

        <Section id="experiences" navLabel="Experiences" label="/experiences" title="" subtitle="">
          <div className={styles.expSplit}>
            <div className={styles.expIndex} aria-label="Experience index">
              {experience.map((e, idx) => (
                <button
                  key={`${e.role}-${idx}`}
                  className={`${styles.expItem} ${idx === activeExp ? styles.expItemActive : ""}`}
                  onClick={() => setActiveExp(idx)}
                >
                  <div className={styles.expOneLine}>{e.orglabel}</div>
                </button>
              ))}
            </div>

            <div className={styles.expDetail} aria-label="Experience details">
              {/* ✅ Animated wrapper: key changes every selection so the animation replays */}
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
                  <div className={styles.mono} style={{ color: "rgba(255,255,255,0.50)", fontSize: 12 }}>
                    {exp.time}
                    {exp.location ? ` · ${exp.location}` : ""}
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
                    {exp.links.map((l) => (
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

        <Section id="projects" navLabel="Projects" label="/projects" title="" subtitle="">
          <div className={styles.projShelf}>
            <div className={styles.projRail} aria-label="Project shelf">
              {projects.map((p, idx) => (
                <div
                  key={p.title}
                  className={styles.projCard}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select project: ${p.title}`}
                  onClick={() => setActiveProject(idx)}
                  onKeyDown={(e) => {
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
                </div>
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

        <Section id="gallery" navLabel="Gallery" label="/film_strip" title="" subtitle="">
          <div className={styles.gallerySplit} aria-label="Gallery">
            {/* Left: big preview */}
            <div className={styles.galleryPreview} aria-label={`Preview: ${gItem.title}`}>
              <img
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

        <Section id="contact" navLabel="Contact" label="/say_hi!" title="" subtitle="">
          <div className={styles.contactStack}>
            <div className={styles.contactWide}>
              <div>
                <div className={styles.contactEmail}>anujshah7567@gmail.com</div>
                <div className={styles.contactNote}>Feel free to reach out - I'll reply when I can.</div>
              </div>

              <div className={styles.contactActions}>
                <Link className={styles.pillBtn} href={links.email}>Email</Link>
                <Link className={styles.pillBtn} href={links.github} target="_blank" rel="noreferrer">GitHub</Link>
                <Link className={styles.pillBtn} href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</Link>
              </div>
            </div>

            <div style={{ marginBottom: 200 }}>
              <QuotePill />
            </div>
          </div>
        </Section>

        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Anuj</span>
        </footer>
      </div>

      {/* ✅ Keyframes injected from page.tsx so you don't need to touch CSS */}
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