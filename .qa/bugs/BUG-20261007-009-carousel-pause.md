---
id: BUG-20261007-009
status: open
severity: P2
confidence: High
area: Homepage accessibility
component: TestimonialCarousel, EditorialSection, ServiceGuarantees
created_at: 2026-10-07
source_commit: 8edd9e6
---

# Auto-rotating homepage carousels lack a pause control

## Reproduction

At a mobile viewport, read the service guarantees or editorial carousel for more than five seconds without pointing the mouse at it. Swiper uses autoplay with delay 5000 and disableOnInteraction false. Previous/next controls are available but there is no explicit pause control.

## Expected / actual

Expected: users can stop auto-updating content and read it at their own pace (WCAG 2.2.2). Actual: pauseOnMouseEnter provides only a pointer-dependent temporary pause. Reduced-motion CSS does not disable Swiper's autoplay timer.

## Evidence

Autoplay configuration in `src/features/home/components/testimonial-carousel.tsx`, `src/features/home/components/editorial-section.tsx`, `src/components/shared/service-guarantees.tsx`. This run did not time-control or test autoplay pause; the gap is established from source.

## Resolution

Autoplay restored at the user's explicit request: 5000ms delay, resumes after interaction, pauses on mouse hover. The earlier removal has been reverted. The missing keyboard-accessible pause control remains an open accessibility finding; keeping autoplay is intentional. Playwright now verifies automatic advancement rather than static content.

## Recommended regression

Verify a keyboard-accessible pause/resume action, stop autoplay under reduced motion, and preserve next/previous navigation. Exercise both multi-slide content and watchOverflow-disabled single-slide states.
