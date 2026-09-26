# Suchithra R — Product / APM portfolio

A static, editorial portfolio implementing the approved [design specification](design/PORTFOLIO_DESIGN_SPEC.md). Four independent case studies sit alongside accurately labeled customer and commercial experience. Concept metrics, assumptions, and proposed outcomes remain visibly distinguished from professional achievements.

## Run locally

Requires Node.js 22 or later. No package installation is needed to build or serve the site.

```sh
npm run dev
```

Open http://localhost:4173. The development command builds first, watches `src/` and `prototype/`, and rebuilds on changes. Refresh the browser after editing.

```sh
npm run build
npm run preview
```

Production output is generated in `dist/`. Preview uses port 4173, or the `PORT` environment variable. Stop a running development server before starting preview on the same port.

## Routes

| Route | Content | Optional report |
| --- | --- | --- |
| `/` | Portfolio homepage | Resume, 1 page |
| `/work/driver-cancellations/` | Reducing Repeat Driver Cancellations | 5 pages |
| `/work/ai-visibility-audit/` | AI Visibility Audit | 14 pages |
| `/work/demo-to-payment/` | Demo → Payment Drop-off | 11 pages |
| `/work/myntra-shopping-assistant/` | Myntra Personal Shopping Assistant | 11 pages |
| `/prototype/` | Interactive cancellation concept | Cancellation report |

`404.html` provides a useful missing-page response. Readers are native HTML; PDFs are optional linked artifacts.

## Structure

```text
src/
  components.mjs       Shared shell, project data, figures, tables, actions
  home.mjs             Homepage sections
  case-studies.mjs     Source-grounded reader content
  reader.mjs           Shared case-study reading layout
  assets/              Tokens/CSS, small menu script, fonts, actual UI crop
prototype/             Existing standalone interactive concept
scripts/               Build, local servers, asset capture, validation
design/                Approved spec, implementation plan and report
output/pdf/            Refined cancellation report
dist/                  Generated static site (ignored by Git)
.qa/                   Generated browser evidence (ignored by Git)
```

Edit `src/`, not `dist/`. The build copies the supplied PDFs and links them using readable filenames. It does not modify their contents. The unrelated Payment Reliability report remains in the source repository and is not included as a fifth portfolio project.

## Validate

```sh
npm ci
npm run build
npm run check
npm run test:browser
```

Only browser QA uses development dependencies (`playwright-core`, `@axe-core/playwright`). It uses an installed Chromium browser, detecting common Edge/Chrome locations. Set `BROWSER_PATH` to the executable if needed. The test command does not download browser binaries.

- `check`: generated routes, one H1, local links/assets/anchors, PDF and WOFF2 signatures.
- `test:browser`: starts its own server on 4174; checks six widths (1440, 1280, 1024, 768, 390, 320), screenshots, axe checks, console errors, text reflow, navigation, and prototype interactions.
- `node scripts/visual-review.mjs`: with dev running on 4173, captures project/reader details and a local resource/layout-shift observation. Fixed header overlays are hidden only in element screenshots for inspection.
- `node scripts/motion-check.mjs`: verifies portrait loading, entrances, hover/scroll effects, keyboard cancellation, and live reduced-motion changes on its own server (4175).

See [the implementation report](design/IMPLEMENTATION_REPORT.md) for verified results and limits. Automated accessibility checks do not constitute a complete WCAG conformance audit.

## Assets and prototype

Newsreader and Inter are served locally as WOFF2 files with OFL licenses. Normal browsing makes no third-party requests. `npm run assets:fonts` refreshes them from Google Fonts and requires network access.

The supplied portrait is stored as `src/assets/images/suchithra-r.jpg`. Its oval crop is implemented in CSS, preserving the source photo. Hero and scroll entrances run once; reduced-motion preferences disable the new effects.

`src/assets/images/priority-rematch.webp` is a crop of the real prototype's priority-rematching state. To recapture the PNG, run `node scripts/capture-prototype.mjs`. The delivered WebP was encoded with Pillow at quality 88; preserve its actual 690 × 818 dimensions when replacing it.

The standalone prototype still opens directly from `prototype/index.html`. Integration adds a return link, favicon, and deployed PDF URL at build time. Rider recovery, four driver-reason branches, keep/cancel decisions, replay, and keyboard tabs remain available. Accessibility fixes improve muted-text contrast, focus after transitions, target sizes, and mobile phone sizing.

The cancellation PDF can be regenerated using `python build_case_study.py` with ReportLab installed. All example names, trips, fares, retention values, and trend shapes in the prototype are illustrative.

## Static hosting

Serve `dist/` from the site root on a static host supporting directory `index.html` files. Configure its missing-page handler to use `404.html`. Routes use root-relative assets; hosting beneath a path prefix needs a base-path adaptation. The Node server is a local preview server, not a public production service. No deployment or domain configuration has been performed.
