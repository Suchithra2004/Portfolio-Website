# Implementation plan

## Repository audit

- No existing portfolio framework, package manifest, lockfile, routes, or reusable site components.
- The working `/prototype` contains vanilla HTML, CSS, and JavaScript with rider, driver, and Ops interactions.
- Source assets: resume, four selected case-study PDFs, and an additional Payment Reliability report outside the approved scope.
- The cancellation report is under `/output/pdf`; the approved design handoff is `/design/PORTFOLIO_DESIGN_SPEC.md`.
- Preserve the reports and the prototype's interaction model. Add a return link for portfolio integration.

## Design-to-implementation mapping

1. **Shared system:** source HTML templates, local Newsreader and Inter fonts, shared CSS tokens and a small navigation script. Use a dependency-free Node static build and npm scripts; browser QA tools are development dependencies only.
2. **Homepage `/`:** approved hero and decision excerpt; two featured projects and two supporting projects; About, Product Thinking, Experience, Education, Contact.
3. **Readers:** `/work/driver-cancellations/`, `/work/ai-visibility-audit/`, `/work/demo-to-payment/`, `/work/myntra-shopping-assistant/`. Shared reader shell with project-specific content and diagrams, assumptions, next steps, and PDF access.
4. **Assets:** publish only the selected reports and resume. Capture a real priority-rematch UI crop from the existing prototype. Keep the AI matrix, illustrative funnel, and shopping flow as accessible web-native diagrams.
5. **Prototype `/prototype/`:** retain all current flows; integrate a case-study return link and preserve standalone local access.
6. **Validation:** build and local link checks; browser console and resource checks; six viewport widths; keyboard/menu/prototype checks; reduced motion; automated accessibility scan; visual review and fixes.

## Delivery

Output a static `dist` directory suitable for conventional static hosting. No backend, authentication, third-party widgets, or runtime framework. Document exact run/build commands and the checks actually performed.
