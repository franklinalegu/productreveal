const SHEET_NAME = 'Registrations'

/**
 * Google Apps Script endpoint for the AI Product Reveal landing page.
 * Deploy as a Web app with Execute as: Me and Who has access: Anyone.
 */
function doPost(e) {
  const params = (e && e.parameter) || {}
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME)

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Full name',
      'Email',
      'Phone',
      'Role',
      'Consent',
      'Class start',
      'Timezone',
      'Source',
      'UTM source',
      'UTM medium',
      'UTM campaign',
      'Page URL',
    ])
    sheet.setFrozenRows(1)
  }

  sheet.appendRow([
    new Date(),
    params.name || '',
    params.email || '',
    params.phone || '',
    params.role || '',
    params.consent || '',
    params.classStart || '',
    params.timezone || '',
    params.source || 'AI Product Reveal landing page',
    params.utmSource || '',
    params.utmMedium || '',
    params.utmCampaign || '',
    params.pageUrl || '',
  ])

  return jsonResponse({ ok: true })
}

function doGet() {
  return jsonResponse({ ok: true, service: 'AI Product Reveal registrations' })
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
}
