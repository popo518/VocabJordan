# VocabJordan Aurora Space v6 — QA Report

## Scope
This release adds a space-themed animated backdrop to Aurora v5. It does not change vocabulary data, question banks, learning modes, spaced-review logic, statistics, favorites, sound controls, or local student-data schemas.

## Visual layer
- 3 slow-moving nebula layers (violet, cyan, rose) with elliptical edge masks to avoid visible rectangular layer boundaries.
- 1 low-contrast galaxy/ellipse layer.
- 3 starfield layers with different density and drift speed.
- 1 distant planet with a subdued orbital ring.
- 2 intermittent shooting-star streaks.
- Floating vocabulary words follow different horizontal paths while scaling gradually to simulate depth.
- 10 words on desktop and 8 on tablet/mobile.

## Performance and interaction safeguards
- Decorative layers use `pointer-events: none` and are behind the app content.
- Motion uses CSS transforms and opacity; no continuous JavaScript animation loop was added.
- All decorative motion pauses while the document is hidden.
- With `prefers-reduced-motion: reduce`, the nebula/star/galaxy/planet layers remain static, while comets and moving words are hidden.
- PWA cache identifier updated to `vocabjordan-v14`; manifest colors updated to match the deep-space background.

## Chromium checks
- All 3 inline JavaScript blocks passed `node --check`.
- Rendered at 1366×900, 768×1024, 390×844, and 320×740.
- Word counts: 10 at 1366px; 8 at 768px, 390px, and 320px.
- Layer counts: 3 nebulae, 1 galaxy, 3 starfields, 1 planet, and 2 comets.
- No horizontal overflow at the tested viewport widths.
- Confirmed all decorative children ignore pointer input and clicking a unit card still navigates to the unit menu.
- No page-level JavaScript exceptions were recorded.
- Reduced-motion mode was inspected; moving words and comets are hidden and star/nebula/galaxy animations are disabled.

## Test limitations
- External Google Fonts requests were blocked in the isolated browser test, so Chromium used fallback fonts in the previews. This did not cause a page-level JavaScript exception.
- Physical Android/iOS display, real-world battery consumption, and PWA offline behavior were not tested on actual devices.
