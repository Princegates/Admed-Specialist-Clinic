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

The eight services (Cardiac, Nephrology, Orthopedic, Gynecological, Hematology, Urology, Internal Medicine, Medical Laboratory) are in `public/index.html` under `#specialties`; the booking dropdowns update automatically.

## Automatic deploys (GitHub Actions)
`.github/workflows/deploy.yml` deploys the site to Cloudflare on every push. Add two repository secrets in GitHub (Settings, Secrets and variables, Actions): `CLOUDFLARE_API_TOKEN` (a token from the "Edit Cloudflare Workers" template) and `CLOUDFLARE_ACCOUNT_ID`. You can also run it by hand from the Actions tab.

## Appointment emails and chat
- **Forms to email:** the appointment forms send requests to the clinic's email through Web3Forms (free). Go to web3forms.com, enter the clinic email, then paste the access key they email you into `formAccessKey` in `public/assets/js/config.js`. Until then the form opens the visitor's email app.
- **Chat button:** `chat.routes` in the same file lists what visitors can pick (appointment/clinic, specialist) and which number each goes to. Each opens WhatsApp with their message, or lets them call.

## Day / night mode
The sun/moon button in the header switches themes. The choice is remembered, and first-time visitors get their device's light/dark setting.

Brand colours (sampled from the logo): navy `#00007E`, amber `#FCA901`, red `#FE0000`.
