# liamwalker.me

A digital portfolio built to feel less like a static resume and more like a small personal museum: software projects, robotics seasons, photography collections, school milestones, and the story behind the work.

The site is designed, written, and maintained as a living archive. Some pages are polished case studies, some are visual galleries, and some are intentionally personal snapshots of the path from MiraCosta to Cal Poly SLO.

## What Is Inside

- **Home:** a fast landing page with featured pathways into education, photography, robotics, and projects.
- **MiraCosta:** transfer story, graduation memories, associate degrees, coursework, and campus involvement.
- **Photography:** editable travel collections powered by a JSON content file and generated optimized images.
- **Stove Solutions:** an engineering design project case study.
- **FIRST Robotics:** archived season pages for robot development, competitions, media, and awards.
- **This Website:** a meta case study about the portfolio itself.
- **Socials:** a focused link hub.

## Built With

- **React 19** for the interface.
- **TypeScript** for safer page and component work.
- **Vite** for development and production builds.
- **React Router** for routing.
- **Sharp** for generated responsive and optimized image assets.
- **GitHub Pages** for deployment.

## Getting Started

```bash
npm install
npm run dev
```

The dev command automatically regenerates responsive images first, then starts Vite.

## Useful Scripts

```bash
npm run dev
```

Start the local development server.

```bash
npm run images:generate
```

Regenerate responsive images and photography thumbnails.

```bash
npm run build
```

Clean, type-check, build the client, build SSR output, and prerender static pages.

```bash
npm run lint
```

Run ESLint across the repo.

```bash
npm run deploy
```

Deploy the built site to GitHub Pages.

## Editing Photography Collections

Photography content is intentionally easy to update without digging through page code.

Edit:

```text
src/data/photography.collections.json
```

Use the editing guide here:

```text
src/data/PHOTOGRAPHY_EDITING.md
```

Add images under:

```text
public/assets/Photography/
```

Then run:

```bash
npm run images:generate
```

The generator creates lightweight WebP assets for fast gallery loading while keeping original images available for full-screen viewing.

## Project Shape

```text
src/
  components/      Shared UI pieces
  config/          Site flags and archive config
  data/            Editable structured content
  generated/       Generated image manifests
  lib/             Metadata, image helpers, and utilities
  pages/           Route-level pages
  styles/          Global and page-specific CSS

public/assets/     Source images, fonts, videos, and generated static assets
scripts/           Build and image generation utilities
```

## Design Notes

The site leans into expressive page-specific design instead of one generic template. Each section gets its own visual rhythm: polished portfolio panels, cinematic photography rails, archived robotics pages, and warmer personal storytelling for education.

Performance matters too. Large photography originals are preserved, but the page experience is built around generated display assets so scrolling stays smooth.

## Live Site

[liamwalker.me](https://liamwalker.me)
