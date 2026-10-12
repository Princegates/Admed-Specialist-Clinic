# ADMed Specialist Clinic — website

Static site (HTML + CSS + JS, no build step). The site lives in `public/`; open `public/index.html` locally.

## Deploying (Cloudflare)
`wrangler.jsonc` serves the `public/` folder as static assets. Build command: none. Deploy command: `npx wrangler deploy`. The `name` in `wrangler.jsonc` must match the Worker/project name in the Cloudflare dashboard.

## Adding the clinic's real details
Edit **`public/assets/js/config.js`** — the only file you need to touch:

- `phone`, `address`, `mapsUrl`, `mapEmbedUrl`, `announcement`, `googleRating` and `reviews` are filled from the clinic's Google Maps listing.
- `whatsapp`, `email`, `hours`, `social` — still empty, so hidden. Add them to show WhatsApp/email booking, opening hours and social icons.
- `photos` — put images in `public/assets/photos/` and list them (`hero`, `about`, `services` tiles, `gallery`). The gallery appears once photos exist.
- `doctors`, `reviews` — the Team and Reviews sections appear once you add entries.

The six specialist services (Cardiac, Nephrology, Orthopedic, Gynecological, Hematology, Urology) are in `public/index.html` under `#specialties`; the booking dropdowns update automatically.

## Day / night mode
The sun/moon button in the header switches themes. The choice is remembered, and first-time visitors get their device's light/dark setting.

Brand colours (sampled from the logo): navy `#00007E`, amber `#FCA901`, red `#FE0000`.
