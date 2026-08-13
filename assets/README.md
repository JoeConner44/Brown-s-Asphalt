# Brand assets

Drop two files in this folder:

## `logo.png` — the site logo
- Shown in the site header and footer, and used as the iOS/Apple touch icon
  and the PWA/manifest icon.
- A transparent-background PNG works best. If your logo is dark, note that the
  footer sits on a dark asphalt background — you may want a light/white version
  there; ask and I can wire up a separate `logo-light.png` for the footer.

## `favicon.ico` — the browser-tab icon
- This is the small icon in the browser tab/bookmarks.
- Referenced on every page as `<link rel="icon" href="assets/favicon.ico" sizes="any">`,
  which is the most broadly supported favicon across all browsers.
- A multi-resolution `.ico` (containing 16×16, 32×32, and 48×48) gives the
  sharpest result. Free generators like favicon.io or realfavicongenerator.net
  can produce one from your logo.
- No HTML changes are needed — just add the file at `assets/favicon.ico`.

> If your logo isn't a PNG (e.g. SVG or JPG), tell me the format and I'll update
> the `logo` references to match.
