# Arif & Nisa – Wedding Invitation Website

A premium, mobile-first digital wedding invitation for Arif & Nisa's Walimatul Urus on 27 September 2026.

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Cover page with full-screen hero, couple names, and "Buka Jemputan" button |
| `main.html` | Full invitation with countdown, venue, schedule, gallery, RSVP form |

## Features

- Gold & white premium wedding aesthetic
- Live countdown timer to the wedding date
- Google Maps venue link
- Event schedule / timeline
- Responsive photo gallery with lightbox
- RSVP form (Google Apps Script integration + WhatsApp fallback)
- Optional background music (play/pause button)
- Scroll-reveal animations
- Floating petal animation on cover page

## Running Locally

No build step required. Open `index.html` directly in your browser, or serve with any static file server:

```bash
npx serve .
# then visit http://localhost:3000
```

## Configuring the RSVP System

### Option A – Google Apps Script (saves to Google Sheets)

1. Open [Google Sheets](https://sheets.new) and create a new sheet
2. Go to **Extensions → Apps Script** and paste the following code:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow([
    e.parameter.name,
    e.parameter.pax,
    e.parameter.status,
    new Date()
  ]);
  return ContentService
    .createTextOutput("OK")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

3. Click **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the deployment URL
5. In `main.html`, replace the placeholder:
   ```js
   var scriptURL = "PASTE_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```

### Option B – WhatsApp Only

Leave `scriptURL` as the placeholder. The WhatsApp RSVP button will still work and auto-fills name, pax, and status from the form fields before opening WhatsApp.

### Setting the WhatsApp Number

In `main.html`, update:
```js
var waNumber = "+60123456789"; // ← replace with real number
```

## Deploying to Netlify

Push the repository to GitHub/GitLab, then connect to Netlify. No build command required — set **Publish directory** to `.` (root).

## Customising

| What to change | Where |
|---|---|
| Names, date, venue | Edit text in `main.html` and `index.html` |
| Gold accent colour | CSS variable `--gold: #c59d5f` in both files |
| Cover background image | `.cover-bg` background-url in `index.html` |
| Header background image | `.header-bg` background-url in `main.html` |
| Gallery photos | Replace `<img src="…">` URLs in the gallery section |
| Background music | Replace the `<source src="…">` in `main.html` |
| Event schedule times | Edit `.timeline-item` entries in `main.html` |
