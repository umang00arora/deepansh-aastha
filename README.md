# Deepansh & Astha — Wedding Invitation Website

A royal Indian wedding invitation website with a cinematic opening card, animated sections, six ceremony details, editable family information, countdown, venue directions, calendar download, sharing, and an RSVP form.

## Wedding details already included

- **Couple:** Deepansh & Astha
- **Dates:** 16–18 January 2027
- **Venue:** Rudra Imperial Resort, Sitapur, Uttar Pradesh, India
- **Map:** https://maps.app.goo.gl/F7yuMimjP5LRhhec9?g_st=ac

| Ceremony | Date | Time |
|---|---|---|
| Haldi | 16 January 2027 | 11:00 AM |
| Sangeet | 16 January 2027 | 7:00 PM |
| Mehndi | 17 January 2027 | 10:00 AM |
| Ghudchadi | 18 January 2027 | 12:00 PM |
| Phere | 18 January 2027 | 2:00 PM |
| Reception | 18 January 2027 | 8:00 PM |

## 1. Run locally

Install Node.js 20 LTS or later. In this project folder:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

To create a production build:

```bash
npm run build
npm run preview
```

## 2. Add parents' and family members' names

Edit `src/data/wedding.ts`.

Update these fields:

- `wedding.groom.father`
- `wedding.groom.mother`
- `wedding.bride.father`
- `wedding.bride.mother`

Then update the `families.groom.members` and `families.bride.members` lists with the exact family members presenting the invitation.

The current bracketed values are placeholders, not actual names. Replace them before publishing.

## 3. Connect RSVP to Google Sheets

The RSVP form uses a Vercel serverless proxy (`/api/rsvp`) to call Google Apps Script and receive a verifiable save response. This avoids the opaque response limitation of browser `no-cors` requests.

### A. Create the spreadsheet

1. Create a new Google Sheet.
2. Copy the spreadsheet ID from its URL. It is the long value between `/d/` and `/edit`.
3. Open **Extensions → Apps Script**.

### B. Add the backend

1. Open `backend/Code.gs` in this project.
2. Replace `PASTE_GOOGLE_SHEET_ID_HERE` with your spreadsheet ID.
3. Paste the complete code into the Apps Script editor and save it.
4. In Apps Script, choose **Deploy → New deployment**.
5. Select **Web app**.
6. Set **Execute as: Me**.
7. Set access to **Anyone** (required for public guest submissions).
8. Deploy and authorize the script.
9. Copy the deployed Web App URL ending in `/exec`.

Anyone with the endpoint can submit an RSVP. The script validates basic fields but does not authenticate the guest. Consider adding abuse protection (for example, CAPTCHA and rate limiting) before widely publishing. Keep the spreadsheet private and never share its edit access publicly.

### C. Configure the website

1. In Vercel Project Settings → Environment Variables, add:

```env
APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
VITE_RSVP_ENDPOINT=/api/rsvp
VITE_SITE_URL=https://your-public-site-url
```

2. Redeploy the Vercel project after adding these variables.
3. Submit a test RSVP and verify that a new row appears in the Google Sheet. The website only shows success when the proxy receives a successful response from Apps Script.

For local frontend design work, RSVP submission will not work unless you run the Vercel development environment (`vercel dev`) with the environment variables configured. You can still preview the rest of the site with `npm run dev`.

### D. Create the dashboard

After the first RSVP has created the `RSVP` sheet:

1. Return to Apps Script.
2. Select `createDashboard` in the function dropdown.
3. Click Run and authorize if prompted.
4. A `Dashboard` sheet will be created with summary formulas.

Keep the Google Sheet private. It contains guests' names and phone numbers.

## 4. Deploy to Vercel

1. Push this project to a private or public GitHub repository.
2. Sign in to Vercel and import the repository.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add `APPS_SCRIPT_URL`, `VITE_RSVP_ENDPOINT=/api/rsvp`, and `VITE_SITE_URL` in Vercel Project Settings → Environment Variables.
7. Deploy.

After deployment, update `VITE_SITE_URL` to the final URL and redeploy.

## 5. Replace gallery placeholders

The current gallery uses remote Unsplash photographs as temporary visual placeholders. Replace them with photographs you have permission to use.

Put optimized images in `public/images/` and update the `.tile-one`, `.tile-two`, and `.tile-three` background-image rules in `src/styles.css`.

For WhatsApp link previews, add a real 1200×630 image at `public/og-wedding.jpg`, then add this tag to `index.html`:

```html
<meta property="og:image" content="https://YOUR-DOMAIN/og-wedding.jpg" />
```

Social platforms may cache previews, so a preview change may not appear immediately.

## 6. Before publishing checklist

- [ ] Replace all parent and family placeholders.
- [ ] Add approved couple/family photographs.
- [ ] Confirm the venue map opens correctly.
- [ ] Deploy Apps Script and configure `VITE_RSVP_ENDPOINT`.
- [ ] Test one accepted RSVP and one declined RSVP.
- [ ] Verify records in the private Google Sheet.
- [ ] Run `npm run build`.
- [ ] Test on an Android phone and an iPhone-sized viewport.
- [ ] Set the final website URL and social preview image.
- [ ] Share the public invitation URL with guests.

## Notes

- All event times are interpreted in India Standard Time (UTC+05:30).
- Calendar export creates one `.ics` file containing all six ceremonies. Event durations are set to 90 minutes as a practical default and can be edited in `src/App.tsx`.
- Family names remain editable placeholders until the family supplies the exact names.
- The administrative guest list is kept in the private Google Sheet; this project does not expose a public admin page containing guest personal information.
- The Vercel Function in `api/rsvp.ts` proxies submissions to Apps Script and returns a verifiable response to the browser.
