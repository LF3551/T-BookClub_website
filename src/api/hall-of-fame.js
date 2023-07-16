const express = require('express');
const { google } = require('googleapis');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const app = express();

// API endpoint for hall of fame data
app.get('/hall-of-fame', async (req, res) => {
  try {
    // Ваш код для обработки данных таблицы Google Sheets
    // ...

    res.json(usersData);
  } catch (error) {
    console.error('Error fetching hall of fame data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;