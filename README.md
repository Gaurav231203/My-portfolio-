# Aurora — Creative 3D Portfolio

An aesthetic, fully responsive portfolio front-end built with React + Vite.

## Features

- **3D hero model** — real-time distorted icosahedron, glass ring and floating orbs
  rendered with `three` / `@react-three/fiber` / `@react-three/drei`.
- **3D animated cards** — interactive mouse-tracking tilt cards with glare for
  projects and skills.
- **Aesthetic theme** — layered aurora gradients, glassmorphism, animated gradient
  text and smooth scroll reveals (`framer-motion`).
- **Dark + light mode** — class-based theme with system preference detection and
  `localStorage` persistence.
- **Multi-language** — English, Español, Français, Deutsch and हिन्दी via
  `i18next` / `react-i18next` with automatic language detection.
- **Fully responsive** — mobile-first layout with an animated hamburger dropdown
  menu for small devices.
- Respects `prefers-reduced-motion`.

## Tech stack

React 18 · Vite · Tailwind CSS · Three.js (R3F + drei) · Framer Motion · i18next

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview the build
npm run lint     # lint
```

## Structure

```
src/
  components/     UI + 3D components (Navbar, Hero, Scene3D, TiltCard, ...)
  context/        ThemeContext (dark/light)
  i18n/           i18next config + locale JSON files
  data.js         project / skill metadata
```

## Customising

- Text lives in `src/i18n/locales/*.json`.
- Add a language: create a locale file, register it in `src/i18n/config.js`.
- Project cards: edit `projectMeta` in `src/data.js` and the `projects.items`
  arrays in the locale files.
