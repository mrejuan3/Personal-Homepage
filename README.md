# Personal Homepage

A multi-page personal portfolio website built with vanilla HTML5, CSS3, and ES6+ modules.

🔗 **Live site:** [mrejuan3.github.io/Personal-Homepage](https://mrejuan3.github.io/Personal-Homepage/)

---

## Author

**Melissa Rejuan**  
Northeastern University — MS Data Science  
GitHub: [@mrejuan3](https://github.com/mrejuan3)

---

## Class

<!-- Replace the URL below with the actual course link -->
[Web Development – Course Page](https://johnguerra.co/classes/webDevelopment_online_summer_2026/)

---

## Project Objective

Build a fully static, three-page personal homepage that demonstrates core front-end skills:

| Requirement | Implementation |
|---|---|
| HTML5 semantic markup | `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<ul>`/`<li>` throughout |
| CSS3 layout & animation | Flexbox centering, `position: sticky` nav, `stroke-dasharray` signature draw, `IntersectionObserver` card entrance |
| ES6+ modules | `type="module"` on every `<script>`; `import`/`export` between `main.js` and `projects.js` |
| Bootstrap 5 grid | Responsive 3 → 2 → 1 column project grid via `col-lg-4 col-md-6` |
| Accessibility | `alt` text on all images, `aria-label` on icon-only links, `aria-hidden` on decorative SVGs |

### Pages

- **Home (`index.html`)** — animated SVG signature with staggered draw effect, greeting, and footer tagline
- **About (`about.html`)** — circular headshot, biographical paragraph
- **Projects (`projects.html`)** — six project cards, each with a unique hand-drawn SVG illustration, a skill tag, and a GitHub link

---

## Screenshot

<!-- After taking a screenshot, save it to images/screenshot.png and remove this comment -->
![Homepage screenshot](images/screenshot.png)

---

## Project Structure

```
Personal-Homepage/
├── index.html          # Home page
├── about.html          # About page
├── projects.html       # Projects page
├── css/
│   ├── index.css       # Home page styles
│   ├── about.css       # About page styles
│   └── projects.css    # Projects page styles (includes Bootstrap overrides)
├── js/
│   ├── main.js         # Entry point — imports and calls page initialisers
│   └── projects.js     # IntersectionObserver card entrance animation
├── images/
│   ├── photo.jpeg      # Headshot used on About page
│   └── favicon_io/     # Favicon set (all sizes + site.webmanifest)
├── package.json        # "type": "module" + ESLint/Prettier dev deps
└── eslint.config.mjs   # ESLint flat config
```

---

## Instructions to Build

This is a **fully static site** — there is no compile or bundle step. You only need Node.js installed if you want to run the linter.

### 1 — Clone the repository

```bash
git clone https://github.com/mrejuan3/Personal-Homepage.git
cd Personal-Homepage
```

### 2 — Install dev dependencies (optional — linting only)

```bash
npm install
```

This installs ESLint and Prettier. The website itself has no npm runtime dependencies.

### 3 — Open in a browser

**Option A — VS Code Live Server (recommended)**  
Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, right-click `index.html` in the Explorer panel, and choose **Open with Live Server**.  
Live Server auto-reloads the page on every save.

**Option B — Python one-liner**  
```bash
python3 -m http.server 8080
# then open http://localhost:8080 in your browser
```

**Option C — Open the file directly**  
Double-click `index.html` in Finder. Note: `type="module"` scripts require a server (Options A or B) — the page will still display but the card entrance animation on the Projects page will not run when opened as a raw `file://` URL.

### 4 — Lint (optional)

```bash
npx eslint js/
```

---

## Technologies Used

- HTML5
- CSS3 (custom properties, Flexbox, keyframe animations)
- JavaScript ES6+ (modules, `IntersectionObserver`, `classList`)
- [Bootstrap 5.3](https://getbootstrap.com/) — grid system on Projects page
- [Google Fonts](https://fonts.google.com/) — Dancing Script (titles), Inter (body)
- ESLint + Prettier — code quality

---

## License

[ISC](LICENSE)
