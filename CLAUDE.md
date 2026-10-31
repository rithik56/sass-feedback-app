# SASS feedback app

Next.js (App Router), strict TypeScript (no `any`), SCSS modules. No Tailwind or UI libraries.

## Design sources

- Every Figma frame is linked in `design/layouts.md`. Implement from those frames.
- `design/screens/` has a 2x PNG of every frame, named after it. Use them when the Figma tools are unavailable, and flag any value you can only estimate.
- `Mobile, sidebar` links to a layer. Use the frame, node `0:450`.
- Images and icons are served from `public/assets` (copied from `starter-code/assets`). Sample data is in `starter-code/data.json`.
- Recolorable icons go through `components/Icon`, which masks the original SVG files. Don't redraw them.
- Check `/design-system` against the Figma style guide after changing tokens or core components.

## Styling rules

- Never hardcode colors, font properties, radii, shadows or breakpoints in component styles. Use the tokens and mixins below.
- If a value is missing, take it from the Figma frame and add it as a token. Don't guess or use a nearby value.
- Foundations live in `styles/`: `_tokens.scss`, `_mixins.scss`, `_typography.scss`, `_reset.scss`, `globals.scss`.
- Write mobile-first: base styles are for mobile, then use `@include mq(tablet)` and `@include mq(desktop)`.
- The dev server can miss changes to `styles/` partials and keep a stale Sass error. Add new tokens before using them, and restart `npm run dev` if an error names a value that exists.

## Tokens

### Colors

| Token | Value | Use |
|---|---|---|
| `$color-purple` | `#AD1FEA` | Button 1, menu item hover |
| `$color-purple-hover` | `#C75AF6` | Button 1 hover |
| `$color-blue` | `#4661E6` | Button 2, active states, tag text |
| `$color-blue-hover` | `#7C91F9` | Button 2 hover |
| `$color-navy` | `#3A4374` | Button 3, headings, body text |
| `$color-navy-hover` | `#656EA3` | Button 3 hover |
| `$color-red` | `#D73737` | Button 4, errors |
| `$color-red-hover` | `#E98888` | Button 4 hover |
| `$color-navy-dark` | `#373F68` | Sort bar, dark Go Back |
| `$color-slate` | `#647196` | Secondary text |
| `$color-white` | `#FFFFFF` | Cards, menus |
| `$color-surface` | `#F7F8FD` | Page and form field backgrounds |
| `$color-surface-alt` | `#F2F4FF` | Upvote and tag backgrounds, text on dark buttons |
| `$color-surface-hover` | `#CFD7FF` | Upvote and tag hover |
| `$color-orange` | `#F49F85` | Accent |
| `$color-sky` | `#62BCFA` | Accent |
| `$color-icon-muted` | `#CDD2EE` | Go Back arrow on dark |

- The style guide labels the dark navy swatch `#4661E6`. Its real value is `#373F68`.
- Figma also uses `#F2F4FE`. Always use `$color-surface-alt` instead.
- Roadmap status colors: `planned` is `$color-orange`, `in-progress` is `$color-purple`, `live` is `$color-sky`.
- The header gradient uses `public/assets/suggestions/<size>/background-header.png`.

### Typography

Font: Jost (400, 500, 600, 700), loaded with `next/font`. Apply styles with `@include type(<name>)`.

| Name | Weight | Size / line height | Letter spacing |
|---|---|---|---|
| `h1` | 700 | 24px / 35px | -0.33px |
| `h2` | 700 | 20px / 29px | -0.25px |
| `h3` | 700 | 18px / 26px | -0.25px |
| `h4` | 700 | 14px / 20px | -0.2px |
| `body-1` | 400 | 16px / 23px | none |
| `body-2` | 400 | 15px / 22px | none |
| `body-3` | 600 | 13px / 19px | none |
| `upvote` | 700 | 13px / 19px | -0.18px |
| `button` | 700 | 14px / 20px | none |
| `caption` | 400 | 14px / 20px | none |
| `caption-sm` | 400 | 13px / 19px | none |
| `title-sm` | 700 | 13px / 19px | -0.18px |
| `button-sm` | 700 | 13px / 19px | none |
| `count` | 700 | 16px / 23px | -0.22px |
| `brand-sm` | 700 | 15px / 22px | -0.19px |
| `subtitle` | 500 | 15px / 22px | none |
| `subtitle-sm` | 500 | 13px / 19px | none |

### Shape and effects

| Token | Value | Use |
|---|---|---|
| `$radius-lg` | `10px` | Buttons, cards, menus |
| `$radius-sm` | `5px` | Form fields |
| `$radius-full` | `50%` | Status dots |
| `$shadow-menu` | `0 10px 40px -7px rgba(55, 63, 104, 0.35)` | Menus |
| `$divider` | `rgba(58, 67, 116, 0.15)` | Dividers |
| `$overlay` | `rgba(0, 0, 0, 0.5)` | Mobile drawer backdrop |

### Spacing

The style guide has no spacing scale. Measure spacing from the page frames and only add a `$space-*` token once a value repeats. Don't use a generic 4/8px scale.

### Breakpoints

| Mixin | Applies from |
|---|---|
| `mq(tablet)` | 768px |
| `mq(desktop)` | 1024px |

Figma's desktop frames are 1440px wide and has no frames between 768px and 1440px. Desktop layouts must adapt from 1024px up, then match Figma at 1440px.

## Core components

| Component | Size | States |
|---|---|---|
| Button (4 variants) | 44px high, 24px side padding; `compact` is 40px high with 16px padding on mobile | Hover uses the variant's `-hover` color |
| Go Back (text, or on dark) | Text only, 13px gap after the arrow; `dark` has no background of its own | Hover underlines the text |
| Upvote | 40×53px; `compact` is horizontal, 69×32px, on mobile; `horizontal` is 69×32px at every width, 40px high on desktop | Hover `$color-surface-hover`; active `$color-blue` with white text |
| Tag | 30px high, 16px side padding | Hover `$color-surface-hover`; active `$color-blue` with white text |
| Text field / select | 48px high, 24px side padding; textarea 96px | Active: 1px `$color-blue` border; error: 1px `$color-red` border and message |
| Dropdown menu | 48px rows, 16px below its trigger | Hover: `$color-purple` text; selected: checkmark |

- Form errors follow `Desktop, active` in the New feedback section of `design/layouts.md`, plus the error field in the style guide. Every required field gets the same treatment.
- Mobile Roadmap has one tab per status (`planned`, `in-progress`, `live`), starting on `in-progress`. Figma has one frame, so the other tabs follow its pattern. Inactive tab text is 40% opacity.

## Component conventions

- Each component gets a folder: `components/Button/Button.tsx` and `components/Button/Button.module.scss`.
- Use PascalCase for components and an exported `<Name>Props` interface for props.
- In SCSS modules, import foundations with a relative path: `@use "../../styles/tokens" as *;` and `@use "../../styles/mixins" as *;`.
- Use the `hover` mixin for hover styles so `/design-system` can show them with `data-state="hover"`.
- Reuse components from `components/` before creating new ones.
- Every interactive element needs hover, `:focus-visible` and disabled styles.
- Figma doesn't define focus or disabled styles. Use a 2px `$color-blue` outline with a 2px offset for focus, and 50% opacity with `cursor: not-allowed` for disabled. On dark or gradient backgrounds, use a `$color-white` outline instead with `@include focus-ring($color-white)`, because blue is hard to see there. Text fields and textareas are also an exception: Figma's active state, the 1px `$color-blue` border, is their focus style. The Roadmap summary's disabled View link is 25% opacity, from Figma's desktop empty frames.

## Accessibility

- Use semantic HTML: real `button`, `a`, `nav` and `main` elements, and one `h1` per page.
- Every form field has a `label`. Link error messages with `aria-describedby` and set `aria-invalid`.
- Menus, the mobile drawer and Roadmap tabs must work with a keyboard.
- Icon-only controls need an `aria-label`. Decorative images use `alt=""`.
