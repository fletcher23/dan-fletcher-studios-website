# Dan Fletcher Studios — static site ("Studio Bold")

Plain HTML, CSS, and JS. **No build step, no Node, no npm.** Open any
`.html` file in a browser, or upload the whole `site/` folder to any host.

## Files
- `index.html`, `services.html`, `about.html` (Studio), `contact.html`,
  `404.html` — the pages
- `styles.css` — all styling. Colors and fonts live in `:root` at the top.
- `site.js` — the shared **nav + footer** (edit them once here, every page
  updates) plus the mobile menu and contact-form logic.
- `assets/` — logos, favicon, and your photos

## The look
Bold editorial: cream background, Geist display type at large sizes,
monospace labels, red bleed sections. Four pages: Home, Services, Studio,
Contact. (No portfolio page yet — easy to add when there's work to show.)

## Common edits
- **Nav / footer links** → edit `site.js` (the `LINKS` array / footer block).
- **Colors or fonts** → edit the `:root` variables at the top of `styles.css`.
- **Page copy or prices** → edit the relevant `.html` directly.
- **Add a real photo** → drop the image in `assets/`, then replace a
  placeholder `<div class="ph">…</div>` with
  `<img src="assets/your-photo.jpg" alt="…" style="aspect-ratio:3/4;object-fit:cover;" />`.

## Contact form
Uses [Formspree](https://formspree.io) (free tier works). In `contact.html`,
replace `YOUR_FORMSPREE_ID` in the form `action` with your real form ID.
No backend needed.

## Going live
Upload the `site/` folder to any static host — Netlify (drag-and-drop),
Vercel, Cloudflare Pages, GitHub Pages, or basic shared hosting. Point your
domain at it. Done.
