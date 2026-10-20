# AMWELL Research Lab — static website for GitHub Pages

Ready to host: no build step, no Lovable needed. Every file in this folder IS the final production site.

## Deploy
1. Create a GitHub repository (e.g. `amwell-website`).
2. Upload EVERYTHING in this folder to the repository root (index.html must be at the top level). Keep folders intact and include the hidden `.nojekyll` file (on GitHub's web uploader, drag the folder contents in; if .nojekyll is skipped, create it with "Add file → Create new file" named `.nojekyll`).
3. Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, folder `/ (root)` → Save.
4. After ~1 minute the site is live at `https://<username>.github.io/<repo>/`.

All links are relative, so it works under any repository name or a custom domain. Pages are folders (`about/index.html`), so direct links and refreshes work.

## Contents
- `index.html` and one folder per page (about, research, team, publications, get-involved, resources, team member profiles)
- `images/` — logo, emblem, wordmark, favicon, headshots
- `assets/` — styles and `site.js` (mobile menu, form)

## Contact form
Sends to Formspree (https://formspree.io/f/xvkzjqrr) from the visitor's browser, shows a thank-you message without leaving the page, and shows an error message if sending fails.
