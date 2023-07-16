// hall-of-fame.js
const express = require('express');
const path = require('path');
const { google } = require('googleapis');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const app = express();
// Разрешение запросов CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3002'); // Укажите URL вашего клиентского приложения
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client/build')));

// API endpoint for hall of fame data
app.get('/hall-of-fame', async (req, res) => {
  // Ваш код обработки запроса
});

// Handle other routes and serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
});

module.exports = app;