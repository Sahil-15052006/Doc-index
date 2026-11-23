# Doc Index

A static, two-page documentation index built with **React + TypeScript + Tailwind CSS (v4) + Vite + Motion**.
Warm editorial design with restrained accent color, square edges, light/dark themes, and smooth animations.

- **Page 1 — Home** (`/`): intro, top 3 featured docs, contact section.
- **Page 2 — Docs** (`/docs`): every document, with search and category filters.
- **Theme**: light/dark toggle in the header. Follows the OS preference on first visit,
  then remembers your choice in `localStorage`.
- **Motion**: page transitions, hero line reveals, staggered cards, hover lifts,
  sliding nav/filter indicators, animated theme icon, scrolling word tickers,
  count-up stats, a rotating mark, and a reading-progress bar.

## Edit your content

All documentation lives in one array of objects:

```ts
// src/data/docs.ts
export const docs: Doc[] = [
  {
    id: "unique-id",
    name: "Document title",
    field: "Troubleshooting", // category
    link: "https://example.com/your-doc",
    summary: "Optional one-line description.",
    featured: true, // optional — pins it to the home page
  },
  // ...
];
```

- `id` must be unique.
- `name`, `field`, and `link` are required.
- `summary` is optional.
- Set `featured: true` on up to 3 docs to choose what appears on the home page.
  If nothing is featured, the first 3 entries are shown.
- Categories, counts, and the top-3 list are all derived automatically from this array.

Site details (name, owner, email, social links, "updated" date) are in
`src/data/site.ts`.

## Shared pieces

| File | Purpose |
| --- | --- |
| `src/context/DocsContext.tsx` | Provides the docs array, featured docs, and categories to every page |
| `src/context/ThemeContext.tsx` | Light/dark theme state, OS preference, and `localStorage` persistence |
| `src/components/Card.tsx` | Shared card component (title, category, link) used on both pages |
| `src/components/Layout.tsx` | Header, animated navigation, page transitions, contact scroll, footer |
| `src/components/ThemeToggle.tsx` | Animated sun/moon theme switch |
| `src/components/Reveal.tsx` | Scroll-into-view reveal wrapper |
| `src/components/Marquee.tsx` | Seamless Motion-driven word ticker (pauses offscreen and for reduced motion) |
| `src/components/ScrollProgress.tsx` | Accent reading-progress bar pinned to the viewport top |
| `src/components/CountUp.tsx` | Animates the stat numbers when they enter view |
| `src/components/RotatingMark.tsx` | Decorative continuously rotating asterisk (stops for reduced motion) |
| `src/components/ColorTrio.tsx` | Reusable accent / cobalt / acid dot motif |
| `src/lib/animations.ts` | Shared easing, spring, and variant presets |
| `src/lib/categories.ts` | Maps each field to a color tone and its chip/dot/bar classes |
| `src/components/SectionHeading.tsx` | Numbered section heading used on the home page |

## Theming and color

The interface is driven by semantic CSS variables in `src/index.css`, exposed as
Tailwind colors:

- `paper` / `surface` / `ink` — page background, raised card surface, and text.
- `accent` — vivid orange, used for active indicators, the highlighted headline
  word, category bars, selection, and fine accent rules.
- `cobalt` — blue, used for the contact ticker ribbon and the Work category.
- `acid` — lime, used for the docs ticker ribbon and the Project category.
- `grape` — violet fallback for any custom category.
- `accent-strong` / `accent-on-ink` — accessible accent variants for text on
  paper and on inverted `ink` sections respectively.

Each `-ink` companion token gives the readable text color to place on that fill.
Dark mode swaps every variable, so all surfaces, borders, chips, and accents
adapt automatically. `src/lib/categories.ts` maps `Troubleshooting → accent`,
`Work → cobalt`, `Project → acid`, and everything else to `grape`; edit that map
to recolor a category.

The layout uses a 1280px content measure, hairline dividers, square corners,
subtle card elevation, and small accent touches rather than large blocks of
color. Primary actions are ink-filled and shift to accent on hover, which keeps
the interface calm while preserving the palette.

The theme class is applied to `<html>` before first paint by a small script in
`index.html`, preventing a flash of the wrong theme. Theme colors are also
mirrored to the browser `theme-color` meta tag.

## Run locally

```bash
npm install
npm run dev
```

> This machine had no system Node.js, so a local copy was installed at
> `~/.local/node` and linked into `~/.local/bin` (already on PATH), so `npm`
> works directly in new terminal sessions.

## Build

```bash
npm run build
npm run preview
```

The production build is written to `dist/`. It uses relative asset paths and
`HashRouter` (`/#/docs`), so it can be hosted at a domain root or a subpath on
any static host — GitHub Pages, Netlify, Vercel, S3 — with no redirect rules
required. Serve the folder over HTTP (for example with `npm run preview`);
browsers block ES modules loaded from `file://`.
# Doc-index
