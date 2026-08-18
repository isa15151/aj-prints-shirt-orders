# A&J Prints Shirt Orders — Free Hosting Setup

This version removes the Netlify dependency for:

- Order-number generation
- Order submission
- Order notifications
- Order storage

The customer-facing website remains a static site. The order backend uses a Google Sheet + Google Apps Script Web App, which can be used at no additional cost for a small shirt-order site.

## Part 1 — Create the free order sheet

1. Sign in to the Google account you want to use for A&J Prints orders.
2. Go to Google Sheets and create a blank spreadsheet.
3. Name it something like **A&J Prints Shirt Orders**.
4. Keep the spreadsheet open.

## Part 2 — Add the free order backend

1. In the spreadsheet, choose **Extensions → Apps Script**.
2. Delete the starter code.
3. Open the `google-apps-script/Code.gs` file included with this ZIP.
4. Copy its entire contents into Apps Script.
5. Change this line:

   `NOTIFY_EMAIL: "PASTE_YOUR_EMAIL_HERE"`

   to the email address where you want new shirt-order notifications sent.
6. Click **Save**.

## Part 3 — Deploy the backend

1. In Apps Script, click **Deploy → New deployment**.
2. Select **Web app** as the deployment type.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone**.
5. Click **Deploy**.
6. Approve the Google permissions when prompted.
7. Copy the **Web app URL**. It will look similar to:

   `https://script.google.com/macros/s/XXXXXXXXXXXX/exec`

## Part 4 — Connect the website to the backend

Open `index.html` in a text editor and find:

`window.AJ_ORDER_ENDPOINT = "PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";`

Replace the placeholder with your Web App URL, keeping the quotation marks. For example:

`window.AJ_ORDER_ENDPOINT = "https://script.google.com/macros/s/XXXXXXXXXXXX/exec";`

Save the file.

## Part 5 — Put the website online for free

### Recommended: GitHub Pages

1. Create/sign in to a GitHub account.
2. Create a new repository. A name such as `aj-prints-shirt-orders` works.
3. Upload the contents of this ZIP to the repository. `index.html` must be in the repository's main/root folder.
4. In the repository, open **Settings → Pages**.
5. Under the publishing/source options, choose the main branch and the root folder.
6. Save.
7. GitHub will provide your free `github.io` website address.

You can use a custom domain later if desired.

## Important

Do not upload the ZIP file itself as the only repository file. Upload the files/folders inside it so that `index.html` is at the root.

## How orders work after the conversion

Customer:

1. Chooses one or more shirts.
2. Can add multiple PCR/FRS options with different sizes/colors.
3. Enters their information.
4. Receives an order number generated entirely in the browser.
5. Pays through Cash App or Venmo.
6. Returns to the page and enters payment confirmation/reference.
7. Taps **I've Paid — Submit Order**.

Backend:

1. Google Apps Script receives the order.
2. The order is added to the Google Sheet.
3. A new-order email is sent to the configured notification address.

## Important limitation

No free hosting provider can honestly promise unlimited traffic with zero limits. This setup removes the Netlify usage-stop issue from the site and makes the customer website a lightweight static site, but GitHub and Google can still have fair-use/service limits.

For the expected traffic of a local shirt-order page, this is a much more appropriate free setup than relying on Netlify's form/function usage for every order.
