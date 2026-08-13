# Brand assets

## `logo.png` — the site logo
- Shown in the site header and footer.
- A transparent-background PNG works best. If your logo is dark, note that the
  footer sits on a dark asphalt background — you may want a light/white version
  there; ask and I can wire up a separate `logo-light.png` for the footer.
- If your logo isn't a PNG (e.g. SVG or JPG), tell me and I'll update the
  references.

## Favicon set (from favicon.io)
Drop these files from the favicon.io download **into this `assets/` folder**
(the HTML and `site.webmanifest` already reference them at these exact names):

- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180×180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

**Skip the `site.webmanifest` that came in the favicon.io zip** — this project
already has its own richer `site.webmanifest` at the repo root (with the business
name, colors, and the two Android icons wired up). No HTML changes are needed;
just add the image files above.
