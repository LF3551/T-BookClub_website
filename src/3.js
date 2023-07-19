const creds = require('../keys.json');
const { GoogleSpreadsheet } = require('google-spreadsheet');

// Идентификатор таблицы Google Sheets
const SPREADSHEET_ID = '1Vlm9rD2NoO0LO1UczYjTU5bPSd214LrwcpDtmjm5IDI';

// ID таблицы
const SHEET_ID = '643937409';

async function accessSpreadsheet() {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  console.log(`Title: ${sheet.title}`);
}

accessSpreadsheet().catch((error) => {
  console.error('Произошла ошибка:', error.message);
});
