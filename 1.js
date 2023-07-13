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
client.authorize((err, tokens) => {
  if (err) {
    console.error('Ошибка аутентификации:', err);
    return;
  }

  console.log('Успешная аутентификация');
  
  // Создание экземпляра Google Sheets API
  const sheets = google.sheets({ version: 'v4', auth: client });

  // Здесь можно выполнять операции с Google Sheets API
  // Например, чтение данных из таблицы
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: '1Vlm9rD2NoO0LO1UczYjTU5bPSd214LrwcpDtmjm5IDI',
      range: 'halloffame!C2:E',
    },
    (err, res) => {
      if (err) {
        console.error('Ошибка чтения данных:', err);
        return;
      }

      const rows = res.data.values;

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
    }
  );
});