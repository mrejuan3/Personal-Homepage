# Updates

Changes made so the Projects page matches the style of the Home and About pages.

---

## Projects Page Styling

### Why it looked different

`projects.html` loaded the full Bootstrap stylesheet (`bootstrap.min.css`). Besides the grid, it resets the whole page, which:

- removed the browser's default 8px page margin, so the nav bar sat higher and ran edge to edge
- changed the page font, text color, and line spacing
- changed heading weights and paragraph margins

### What changed

| Element | Before | After (matches Home / About) |
|---|---|---|
| Bootstrap | Full `bootstrap.min.css` + `bootstrap.bundle.min.js` | `bootstrap-grid.min.css` only (grid still uses `col-lg-4 col-md-6`) |
| Font | Dancing Script (title), Inter (cards) | Browser default serif, same as Home and About |
| Nav bar | Shifted up, full width | Same position and inset as the other pages |
| Title | Script font, dark navy, up to 5rem | 2rem, pink `#b6195d` (same as "About Me") |
| Subtitle | Gray, 1rem | Removed |
| Project names | Dark navy | Maroon `#530828` (same as "Welcome to my page") |
| Cards | Drop shadows, large rounded corners | Thin `#e5e7eb` border (same as the nav bar) |
| Skill tags | Indigo pills | Removed |
| GitHub links | Gray bordered button | Navy `#050e1f`, purple `#580ce4` on hover (same as nav links) |

### Code style

- `css/projects.css` rewritten to follow `index.css` and `about.css`: same nav block, short lowercase comments, plain color values (no CSS variables)
- `projects.html` `<head>` laid out like the other pages (multi-line favicon links, `<!-- browser logo -->` comment)
- Removed the Google Fonts link and the unused Bootstrap JavaScript bundle
- Replaced decorative banner comments with simple lowercase comments
- Formatted `projects.html` with Prettier, matching `index.html`

### Square panels

- Each project card uses `aspect-ratio: 1 / 1`, so it stays square at every screen width
- Corners are sharp (`border-radius: 0`) instead of rounded
- The illustration fills the top half of the card; the title and GitHub link fill the bottom half
- Card padding and spacing were tightened so the text fits inside the square

### Skill tags removed

- Removed the skill tag (Data Science, Data Visualization, NLP, Machine Learning, Cloud Computing, AI) from each card, along with its CSS
- The GitHub link stays at the bottom of each card, so the links still line up across each row

### Hover motion removed

- Project cards no longer lift up when you hover over them

### Subtle hover effect

- Hovering a card turns its border pink (`#d71e6e`) and turns "View on GitHub" purple (`#580ce4`); see "Elegant details" below for the color bloom that replaced the illustration zoom
- The whole card is now clickable: the GitHub link is stretched over the card, so clicking anywhere opens the project
- The same border and link color appear when a keyboard user tabs to the card

### Projects from resume

All nine projects from the Projects section of the resume are on the page, in resume order:

1. Life Insurance Power Dialer (new)
2. SideQuest Web Application (new, links to the live site at side-quest-p4.vercel.app)
3. BreastCare Decision Support Tool (renamed from "Breast Cancer Risk Modelling & Clinical Decision Support")
4. Exoplanet Exploration
5. NLP Analysis of Tweets by Global Leaders
6. Nurturing Mental Health Through Trees (new)
7. Evolutionary Computing for Resource Allocation (renamed from "TA Resource Allocation")
8. Data Science Salary Predictions (new)
9. Correlations in Autism Research and Political Partisanship (new)

Global Longevity Analysis and Business Scaling & Production were removed because they are not on the resume.

Each new card has its own illustration in the same style as the existing ones.

### Project descriptions

- Each card has a three-sentence description under the title, written from the resume, that explains what the project is, what it does, and how it was built; the statistics stay on the resume
- The description uses 0.9rem text so a few sentences fit inside the square
- Between 992px and 1199px wide, the grid shows 2 cards per row instead of 3 (`col-xl-4 col-md-6`), so cards don't get too small for the text

### Card layout fix

- The text area has the same height on every card (room for a 2-line title and a 6-line description), and the illustration fills the rest of the square, so there is no large empty gap
- Pictures, titles, and GitHub links line up across each row
- Illustrations are scaled to fit (`preserveAspectRatio="xMidYMid meet"`) instead of cropped, so nothing gets cut off at the edges
- Each illustration's background extends past its frame, so the extra space around a scaled picture blends in with no visible edge

### Looping line motion design

- A thin pink line (`#d71e6e`) with cursive loops runs down the whole page, from beside the title, across the gaps between each row of cards, and around the sides of the page
- The line draws itself as you scroll, like the signature on the Home page, with a small heart riding at its tip; once drawn, it stays drawn
- The line passes behind the cards (cards now have a white background) and never blocks clicks
- The path is rebuilt from the real card positions whenever the page is resized, so it works at every screen width
- Visitors who have "reduce motion" turned on see the finished line with no animation
- Code lives in `js/flourish.js`, imported by `js/main.js`
- Rows of cards are spaced further apart (3.5rem) to give the loops room

### Cards pop up as the line passes

- Each project card stays hidden until the line passes over it, then pops up with a soft fade, rise, and slight overshoot
- Cards appear in the order the line reaches them: row 1 left to right, row 2 right to left, row 3 left to right
- The line draws at a steady pen-like pace, and speeds up to catch up after a fast scroll so there is never blank space for long
- With "reduce motion" turned on, all cards are shown right away
- When the line is not on the page, cards fall back to the original scroll fade-in (`js/projects.js`)

### Project links

- BreastCare Decision Support Tool links to its GitHub repo ([mrejuan3/Capstone_Cancer_Prediction](https://github.com/mrejuan3/Capstone_Cancer_Prediction)) and opens in a new tab
- Exoplanet Exploration links to its GitHub repo ([mrejuan3/Exoplanet_Exploration](https://github.com/mrejuan3/Exoplanet_Exploration)) and opens in a new tab
- SideQuest links to its live site
- Cards without a link yet have no "View on GitHub" button, and only cards with a link get the pink border on hover

### Elegant details

- **Handwritten title:** "My Projects" writes itself in as a pink outline, then fills in, like the signature on the Home page. The line starts drawing once the title is finished. Screen readers still read the title as normal text.
- **Pen-drawn frames:** each card has a thin pink frame around it, 6px out on every side. When the line reaches a card, the frame is traced around it first, then the card pops up.
- **Softened illustrations:** pictures are fully solid with slightly muted colors until you hover, then bloom to full color (this replaces the 3% zoom)
- **Gallery mat:** each picture sits inside a thin white border, like framed art
- With "reduce motion" turned on, the title appears already filled in

### LinkedIn and email logos

- The nav bar on every page (Home, About, Projects) ends with a LinkedIn logo and an envelope logo, in the same color as the nav links and turning purple on hover
- The LinkedIn logo opens [linkedin.com/in/melissa-rejuan](https://www.linkedin.com/in/melissa-rejuan/) in a new tab
- The envelope opens a new email to melissarejuan@gmail.com in the visitor's mail app
- Screen readers announce them as "LinkedIn" and "Email melissarejuan@gmail.com"

### Navigation labels

- The Home, About, and Projects labels are slightly bigger (0.9rem → 1.05rem) on every page (`index.css`, `about.css`, `projects.css`), so the nav bar stays identical across the site

## About Page

### Handwritten title

- "About Me" writes itself in the same way as "My Projects": a pink outline is traced first, then filled in
- It stays left-aligned next to the photo and shrinks to fit on small screens
- Screen readers still read the title as normal text, and visitors with "reduce motion" turned on see it already filled in
- Styles are in `css/about.css`

### About paragraph

- Replaced with an updated version: says co-founded Navda AI, drops the "finishing up my masters in August" line, and tidies wording and capitalization

### Wider margins

- The photo and paragraph are now centered in a column up to 960px wide, so wide screens have generous space on both sides and lines are easier to read
- More padding all around (5rem top and bottom, 3rem sides) and a wider gap between the photo and text
- Phones get slightly more padding too (3rem top and bottom, 2rem sides)

### Mobile layout

- On screens 640px wide or less, the photo sits on top (slightly smaller, 160px) and the title and paragraph run full width below it, instead of the text being squeezed into a narrow column beside the photo
- On wider screens the photo stays beside the text as before, and it no longer gets squished out of its circle shape

## Projects Page (continued)

### Unchanged

- Bootstrap grid layout (3 → 2 → 1 columns)
- Project SVG illustrations
- Card fade-in animation (`js/projects.js`)

---

## README Notes Now Out of Date

These lines in `README.md` no longer describe the site:

- **Project Structure:** `projects.css` no longer includes Bootstrap overrides.
- **Technologies Used:** Google Fonts (Dancing Script, Inter) are no longer used.
- **Technologies Used:** Bootstrap is now loaded as the grid stylesheet only (`bootstrap-grid.min.css`).
- **Pages:** project cards no longer have a skill tag.
