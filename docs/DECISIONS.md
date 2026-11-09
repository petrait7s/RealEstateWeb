# Decisions

- **Company name**: placeholder "Aurelia Developments"; override via `NEXT_PUBLIC_COMPANY_NAME` now, `site_settings` table from Phase 2.
- **Next.js 16** (latest). `middleware` is now `src/proxy.ts` (next-intl routing).
- **Tailwind v4** CSS-first config; tokens live in `src/styles/tokens.css` as CSS variables and are mapped via `@theme inline` in `globals.css`. The admin Theme Editor will override them at runtime.
- **Fonts**: `@fontsource` packages (self-hosted, no build-time network call to Google). Playfair Display + Inter; Noto Serif Bengali + Hind Siliguri for Bangla.
- **i18n**: next-intl, `localePrefix: as-needed` (English at `/`, Bangla at `/bn`).
- **Theme**: `data-theme` attribute on `<html>`, set pre-paint by inline script; no next-themes (avoids React 19 script warning).
- **Smooth scroll**: Lenis driven by GSAP ticker so ScrollTrigger stays in sync; disabled for reduced motion.
- **Hero backdrop**: CSS/SVG placeholder until media is uploaded; replaced by page-builder hero variants (Phase 6).
- **Unknown routes**: `[...rest]` catch-all calls `notFound()` so the branded localized 404 renders inside the layout.
