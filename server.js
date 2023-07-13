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
app.use(express.static(path.join(__dirname, 'client/build')));

// API endpoint for hall of fame data
app.get('/hall-of-fame', async (req, res) => {
  try {
    const { google } = require('googleapis');
    const keys = require('./keys.json');

    // Аутентификация с использованием ключей доступа
    const client = new google.auth.JWT(
      keys.client_email,
      null,
      keys.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    // Подключение к Google Sheets API
    client.authorize(async (err, tokens) => {
      if (err) {
        console.error('Ошибка аутентификации:', err);
        return res.status(500).json({ error: 'Ошибка аутентификации' });
      }

      console.log('Успешная аутентификация');

      // Создание экземпляра Google Sheets API
      const sheets = google.sheets({ version: 'v4', auth: client });

      try {
        // Здесь можно выполнять операции с Google Sheets API
        // Например, чтение данных из таблицы
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: '1Vlm9rD2NoO0LO1UczYjTU5bPSd214LrwcpDtmjm5IDI',
          range: 'halloffame!C2:E',
        });

        const rows = response.data.values;

        // Создаем уникальные идентификаторы и считаем количество появлений каждого пользователя
        const uniqueUsers = Array.from(new Set(rows.map(row => row[0])));

        const userCounts = {};
        uniqueUsers.forEach((user, index) => {
          userCounts[user] = index + 1;
        });

        // Создаем объект для каждого пользователя с объединенными книгами и авторами в виде списков
        const usersData = uniqueUsers.map(user => {
          const userBooks = [];
          const userAuthors = [];

          rows.forEach(row => {
            if (row[0] === user && !userBooks.includes(row[1]) && !userAuthors.includes(row[2])) {
              userBooks.push(row[1]);
              userAuthors.push(row[2]);
            }
          });

          return {
            'Пользователь': user,
            'Идентификатор': userCounts[user],
            'Появления': rows.filter(row => row[0] === user).length,
            'Книги_Авторы': userBooks.map((book, index) => ({
              'Книга': book,
              'Автор': userAuthors[index]
            }))
          };
        });

        // Выводим результаты
        console.log(JSON.stringify(usersData, null, 2));

        res.json(usersData);
      } catch (error) {
        console.error('Ошибка чтения данных:', error);
        res.status(500).json({ error: 'Ошибка чтения данных' });
      }
    });
  } catch (error) {
    console.error('Error fetching hall of fame data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle other routes and serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});