# AGENTS.md – Arif & Nisa Wedding Invitation

## Project Architecture

This is a zero-dependency static website. All HTML, CSS, and JavaScript is inlined into two files:

```
/
├── index.html      # Cover / landing page
├── main.html       # Full invitation page
├── README.md
└── AGENTS.md
```

No bundler, no framework, no node_modules required at runtime.

## File Responsibilities

### `index.html` (Cover Page)
- Full-screen hero with background image + dark overlay
- CSS `@keyframes` animations: `zoomOut` (Ken Burns on bg), `fadeUp` (content reveal)
- JavaScript: floating petal particles using inline DOM manipulation
- Single CTA: anchor tag linking to `main.html`

### `main.html` (Invitation Page)
- Self-contained; all styles in `<style>`, all logic in `<script>` at bottom
- **Sections in order**: Header → Intro verse → Countdown → Details → Schedule → Gallery → RSVP → Footer
- **Countdown**: `setInterval` every 1000ms against a fixed ISO date string
- **Scroll reveal**: `IntersectionObserver` adds `.visible` class to `.reveal` elements
- **Gallery lightbox**: simple show/hide of a `<div class="lightbox">` overlay
- **WhatsApp button**: dynamically builds `wa.me` URL from live form field values
- **RSVP form**: `fetch()` POST to `scriptURL`; falls back to success display if URL is placeholder
- **Music**: HTML5 `<audio loop>` element, toggled on button click (no autoplay)

## Key Variables (top of `<script>` in main.html)

| Variable | Purpose |
|---|---|
| `scriptURL` | Google Apps Script deployment URL for RSVP → Google Sheets |
| `waNumber` | WhatsApp number for RSVP fallback (e.g. `"+60123456789"`) |
| `target` | ISO 8601 wedding datetime for countdown |

## Design Tokens (CSS variables)

| Variable | Value | Use |
|---|---|---|
| `--gold` | `#c59d5f` | Primary accent |
| `--gold-light` | `#e8c98a` | Hover states, hero text |
| `--gold-dark` | `#9e7a3f` | Gradient start |
| `--cream` | `#fdf8f2` | Light section backgrounds |
| `--dark` | `#1a1209` | Dark section backgrounds |

## Coding Conventions

- **No external dependencies** – all CSS/JS must stay inline in the HTML files
- **Mobile-first** – base styles target small screens; `@media (min-width: …)` for desktop
- **CSS custom properties** for all colour values – change once, updates everywhere
- **`clamp()`** for responsive typography – never hardcode px for font sizes in headings
- **No `async/await`** – use `.then().catch()` for broad WhatsApp browser compatibility
- **No `const`/`let`** – use `var` for maximum compatibility in embedded browsers (WeChat, WhatsApp WebView)

## Non-obvious Decisions

- `var` instead of `const`/`let`: WhatsApp in-app browser on older Android devices can fail on ES6+ variable declarations
- Google Apps Script CORS: the script returns plain text `"OK"` (not JSON) to avoid preflight OPTIONS requests that Apps Script doesn't support natively
- Music audio is not autoplayed: browsers block autoplay without user gesture; the floating music button is the only trigger
- Gallery images use Unsplash placeholder URLs – replace with real photos before production
- The WhatsApp RSVP button href is updated on every `input` event so the URL is always current even if the form isn't submitted first
