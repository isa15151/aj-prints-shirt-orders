const CONFIG = {
  // REQUIRED: Put the email address where you want new shirt orders sent.
  NOTIFY_EMAIL: "PASTE_YOUR_EMAIL_HERE",
  SHEET_NAME: "Orders"
};

function doGet() {
  return ContentService
    .createTextOutput("A&J Prints order endpoint is active.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};
    const required = ["order_number", "name", "total", "payment_method", "payment_confirmation"];
    const missing = required.filter(key => !String(p[key] || "").trim());

    if (missing.length) {
      return response({ ok: false, error: "Missing required fields: " + missing.join(", ") });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(CONFIG.SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submitted At",
        "Order Number",
        "Name",
        "Phone",
        "Facebook",
        "PCR Shirt(s)",
        "FRS Shirt(s)",
        "Total",
        "Payment Method",
        "Payment Confirmation / Reference",
        "Local Pickup"
      ]);
      sheet.setFrozenRows(1);
    }

    const submittedAt = new Date();
    const row = [
      submittedAt,
      clean(p.order_number),
      clean(p.name),
      clean(p.phone),
      clean(p.facebook),
      clean(p.pcr_design),
      clean(p.frs_design),
      clean(p.total),
      clean(p.payment_method),
      clean(p.payment_confirmation),
      clean(p.local_pickup || "Yes")
    ];

    sheet.appendRow(row);

    const emailBody = [
      "NEW A&J PRINTS SHIRT ORDER",
      "",
      "Order Number: " + clean(p.order_number),
      "Name: " + clean(p.name),
      "Phone: " + clean(p.phone),
      "Facebook: " + clean(p.facebook),
      "",
      "PCR Shirt(s): " + clean(p.pcr_design || "None"),
      "FRS Shirt(s): " + clean(p.frs_design || "None"),
      "",
      "Total: " + clean(p.total),
      "Payment Method: " + clean(p.payment_method),
      "Payment Confirmation / Reference: " + clean(p.payment_confirmation),
      "Local Pickup: " + clean(p.local_pickup || "Yes"),
      "",
      "Submitted: " + submittedAt.toLocaleString()
    ].join("\n");

    if (CONFIG.NOTIFY_EMAIL && CONFIG.NOTIFY_EMAIL !== "PASTE_YOUR_EMAIL_HERE") {
      MailApp.sendEmail({
        to: CONFIG.NOTIFY_EMAIL,
        subject: "New Shirt Order " + clean(p.order_number),
        body: emailBody
      });
    }

    return response({ ok: true, orderNumber: clean(p.order_number) });
  } catch (err) {
    console.error(err);
    return response({ ok: false, error: String(err) });
  }
}

function clean(value) {
  return String(value == null ? "" : value).trim();
}

function response(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
