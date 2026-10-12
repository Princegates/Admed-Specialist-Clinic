# ADMed Specialist Clinic — website

Static site (HTML + CSS + JS, no build step). Open `index.html` or host the folder anywhere (GitHub Pages, Netlify, any web host).

## Adding the clinic's real details
Edit **`assets/js/config.js`** — the only file you need to touch:

- `phone`, `whatsapp`, `email`, `address`, `hours`, `social` — anything left empty is hidden automatically.
- `mapEmbedUrl` — paste the *Embed a map* `src` from Google Maps → Share → Embed to show a live map.
- `photos` — put images in `assets/photos/` and list them (`hero`, `about`, `gallery`). The gallery appears once photos exist.
- `doctors`, `reviews` — the Team and Reviews sections appear once you add entries.

The specialties list is in `index.html` (`#specialties`) — edit the cards to match the clinic's actual departments; the booking dropdowns update automatically.

Brand colours (sampled from the logo): navy `#00007E`, amber `#FCA901`, red `#FE0000`.
