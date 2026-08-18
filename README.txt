A&J Prints Shirt Order Page — Free Hosting Version

This version preserves the existing customer-facing design and shirt-order flow while removing the Netlify-specific backend.

Removed from the site:
- Netlify Functions
- Netlify Forms
- netlify.toml
- Netlify-specific order submission

Added:
- Client-side order number generation
- Google Sheets + Google Apps Script order backend
- Email notification through Google Apps Script
- Free-hosting setup instructions

START HERE:
See SETUP-FREE-HOSTING.md

Before the site can submit real orders, you must:
1. Create a Google Sheet.
2. Put google-apps-script/Code.gs into Apps Script.
3. Set NOTIFY_EMAIL in Code.gs.
4. Deploy the Apps Script as a Web App with access set to Anyone.
5. Put the resulting Web App URL into index.html at AJ_ORDER_ENDPOINT.
6. Publish the website using GitHub Pages or another static host.

The Cash App and Venmo links, shirt options, pricing, multiple same-design options, payment confirmation field, order number display, and existing images are retained.
