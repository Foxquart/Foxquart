# Foxquart redesign — build contract

Every agent working on this redesign follows this file. It is the single source of truth for
tokens, voice and rules. Do not invent alternatives; if something is missing, follow the
nearest rule here rather than introducing a new pattern.

Branch: `redesign/brand-2026`

## 1. Brand

Derived from the fox mark: a saturated orange on a near-black squircle. **One accent colour,
nothing else.** No secondary brand hue, no gradient mesh, no glassmorphism, no glow.

Dark is the only mode. There is no light theme.

| Token | Hex | Use |
| --- | --- | --- |
| `--ground` | `#0B0C0F` | page background |
| `--surface` | `#14161B` | cards, header on scroll |
| `--surface-2` | `#1B1E24` | hover, nested panels |
| `--line` | `#262A32` | 1px hairline borders |
| `--line-strong` | `#363B45` | emphasised dividers |
| `--ink` | `#ECEDEF` | headings + body (never pure white) |
| `--ink-2` | `#B9BEC6` | secondary text |
| `--muted` | `#878D97` | captions, labels, metadata |
| `--accent` | `#FF5A0F` | CTA fill, links, eyebrows, live dots |
| `--accent-hover` | `#FF6E2E` | accent hover only |
| `--accent-ink` | `#0B0C0F` | text **on** an accent fill |

**Contrast law.** White on `#FF5A0F` is 3.1:1 and fails. Buttons are `--accent-ink` on
`--accent` (6.3:1). `--accent` on `--ground` is 6.3:1, so accent text on dark is fine.

Use the Tailwind token classes (`bg-surface`, `text-muted`, `border-border`, `bg-primary`).
Never hardcode a hex or a Tailwind palette colour (`bg-white`, `text-gray-500`) in a component.

## 2. Type

- Display: `--font-display` — headings, tight tracking (`-0.02em`), weight 600.
- Body: `--font-sans` — 400. Minimum 16px on mobile.
- Micro: `--font-mono` — eyebrows, metrics, indices, labels. Uppercase, `0.16em` tracking.

Scale: 12 / 14 / 16 / 18 / 22 / 28 / 36 → 48 / 64. Line length capped ~65ch.
Headings get `text-wrap: balance`.

## 3. Shape, depth, motion

- Radius: `rounded-xl` (12px) cards, `rounded-full` pills/buttons, `rounded-2xl` media frames.
- Depth comes from surface tint + 1px hairline, **not** drop shadows. Shadows only under
  floating elements (sticky bar, menu sheet).
- Motion: 140ms micro / 240ms transition / 160ms exit, easing `cubic-bezier(0.16, 1, 0.3, 1)`.
  Stagger 40ms, capped at 6 items. Press = `scale(0.97)`.
- Animate `transform` and `opacity` only. Everything collapses to 0ms under
  `prefers-reduced-motion: reduce`.
- One signature moment per page, not a reveal on every section.

## 4. Mobile-first, non-negotiable

- Design at 375px first. Touch targets ≥44px with ≥8px separation.
- Nothing important behind a hover state.
- `min-h-dvh`, never `100vh`. No horizontal page scroll — wide content scrolls in its own
  container.
- Primary actions in the lower third; respect `env(safe-area-inset-bottom)`.

## 5. Voice

Foxquart is a **product engineering studio**, not a web design agency.

Promise: *Software your business runs on. Built in weeks. Built to keep.*

- Lead with engineered systems (clinic, school ERP, warehouse, automation). Small-business
  sites are evidence of range, not the headline.
- Specific over adjectival. "Reception calls down 60%" beats "we help businesses grow".
- Name systems, not technologies: "patient records and rosters", not "React + Postgres".
- No exclamation marks, no "stunning", no "cutting-edge", no emoji.

## 6. Rules that apply to every file you touch

1. Tokens only — no hardcoded colours.
2. Mobile layout written first, desktop added via `md:` / `lg:`.
3. Every interactive element has a visible `:focus-visible` state.
4. Every image has `width`, `height`, `alt`, and `loading="lazy"` below the fold.
5. Run `npx prettier --write <file>` and `npx eslint <file>` before you finish.
6. Do not touch files outside your assignment — other agents are working in parallel.
7. Never invent proof: no fake logos, metrics, reviews or availability.
