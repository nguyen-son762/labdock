# Project instructions

Read `.codex/AGENTS.md` and the applicable skills/conventions before working in this repository.

## Persistent user preferences

- All carousels must have autoplay enabled. Apply this to new carousels and when updating existing carousels, including the mobile Research Leaders logo carousel. This preference was explicitly requested by the user on 2026-10-08.
- Retain manual swipe and next/back navigation. Keep autoplay running after interaction and during hover/focus; do not add `CarouselPlaybackButton` or a pause/resume control. This updated preference was explicitly requested by the user on 2026-10-18 and supersedes the earlier pause-control preference.
- On desktop (from 1024px), hide carousel navigation when all slides fit in the viewport; show it when the carousel overflows. Keep mobile navigation and autoplay behavior.
