# BAM Striping — Brown's Asphalt Maintenance, Inc.

A complete, SEO-optimized static website for Brown's Asphalt Maintenance (BAM Striping),
a family-run parking lot striping, sealcoating and asphalt maintenance company serving
Athens and North Georgia.

## Pages

| File | Purpose | Primary keyword focus |
| --- | --- | --- |
| `index.html` | Home | Parking lot striping & sealcoating North Georgia |
| `services.html` | Services overview + thermoplastic & signage | Pavement services |
| `parking-lot-striping.html` | Service landing page | Parking lot striping Athens GA |
| `sealcoating.html` | Service landing page | Asphalt sealcoating North Georgia |
| `asphalt-paving.html` | Service landing page | Asphalt paving & repair |
| `about.html` | Company story & values | About BAM / Ken Brown |
| `contact.html` | Contact + quote form + map | Free estimate / contact |
| `404.html` | Custom not-found page | — |

## SEO features

- Unique `<title>` + meta description per page (keyword-targeted, local intent)
- Canonical URLs, Open Graph + Twitter Card tags
- JSON-LD structured data: `LocalBusiness`/`GeneralContractor`, `Service`,
  `BreadcrumbList`, `FAQPage`, `WebSite`, `ContactPage`, `AboutPage`
- `robots.txt` + XML `sitemap.xml`
- Semantic HTML5, single `<h1>` per page, logical heading hierarchy
- Descriptive internal linking and breadcrumbs
- Fast, lightweight (system-driven CSS/JS, no heavy frameworks), mobile-first responsive
- Accessible: skip link, ARIA labels, focus states, reduced-motion support

## Design

- Custom design system in `css/styles.css` — asphalt-charcoal + safety-stripe-yellow palette
- Premium touches: sticky glass header, animated stat counters, scroll reveals,
  hover-lift cards, striping-inspired textures, mobile floating call button
- Vanilla JS (`js/main.js`), no build step required

## Contact form

`contact.html` includes a front-end demo form. To make it live, point the form at a
handler such as [Formspree](https://formspree.io), Netlify Forms, or your own endpoint
(see the comment in `js/main.js`).

## Deploying

This is a plain static site — host it anywhere (GitHub Pages, Netlify, Vercel, or any web
host). For a custom domain on GitHub Pages, add a `CNAME` file with `www.bamstriping.com`.

> Replace the placeholder `images/og-cover.jpg` referenced in the meta tags with a real
> branded social-share image (1200×630) for best link previews.
