````md
# Personal Website (Next.js)

A modern, animated personal website built with **Next.js (App Router)** and **TypeScript**, designed as a clean home for projects, experience, and anything I’m working on.

## Tech Stack
- **Next.js** (App Router)
- **React**
- **TypeScript**
- **CSS Modules**

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm

### Install & Run
```bash
npm install
npm run dev
````

Then open: `http://localhost:3000`

## Project Structure

```
app/
  page.tsx              # Entry page (routes to the main experience)
  exp/                  # Main one-page experience (sections + animations)
    page.tsx            # Landing + sections (About, Experience, Projects, Gallery, Contact)
    content.ts          # Content (links, experience, projects, gallery, quotes)
    styles.module.css   # Styling + spacing + scroll reveal animations
public/
  portraits/            # Images (e.g., hologram portrait)
```

## Editing Content

Most edits can be made in:

* `app/exp/content.ts` — update links, quotes, experience items, projects, and gallery items
* `app/exp/page.tsx` — rearrange sections, add/remove components
* `app/exp/styles.module.css` — spacing, colors, animations, layout tweaks

## Deploy

This project works well on:

* **Vercel** (recommended)
* **Netlify**
* Any Node-compatible host

On Vercel, import the GitHub repo and deploy with the default Next.js settings.

## Notes

* Generated folders like `.next/` and `node_modules/` should not be committed.
* If you change the section routes/folder names under `app/`, your URLs will change accordingly.

## License

MIT (or replace with your preferred license)

```
::contentReference[oaicite:0]{index=0}
```
