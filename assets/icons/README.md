# Home-page service icons

The home page (`index.html`) shows animated GIF icons on five of the service
cards. Drop your GIF files into this folder using these **exact filenames**
(the HTML already points at them):

| Filename | Service card |
| --- | --- |
| `striping.gif` | Parking Lot Striping |
| `sealcoating.gif` | Sealcoating |
| `asphalt-paving.gif` | Asphalt Paving & Repair |
| `thermoplastic.gif` | Thermoplastic Markings |
| `signage.gif` | Signs & Bollards |

Notes:
- The icons render inside a 58×58 rounded tile (`object-fit: cover`), so square
  GIFs look best. Larger source GIFs are fine — they're scaled down.
- The **Maintenance Plans** card does *not* use a GIF. It has a clock icon whose
  hands spin when you hover over that card (pure CSS — nothing to add here).
- If your GIFs use different filenames, either rename them to match the table
  above, or tell me the names and I'll update the `src` paths.
