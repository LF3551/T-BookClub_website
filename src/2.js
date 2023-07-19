// // for node js
// const dotenv = require('dotenv');
// const dotenvConfig = {
//   path: '../.env'
// };
// dotenv.config(dotenvConfig);
// console.log(process.env.KEYS_JSON);
// console.log(process.env.REACT_APP_API_URL);

const admin = require('firebase-admin');
const dotenv = require('dotenv');
const fs = require('fs');

// Путь к вашему локальному файлу с ключами сервисного аккаунта
const localServiceAccountPath = '../keys.json';

// Функция для проверки наличия файла
function checkFileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

// Если файл локального сервисного аккаунта существует, используем его
if (checkFileExists(localServiceAccountPath)) {
  const serviceAccount = require(localServiceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://telegram-bots-379310.firebaseio.com' // Замените на URL вашего проекта Firebase
  });
} else {
  // Если файл не найден, используем переменную окружения
  dotenv.config();

  const serviceAccount = process.env.KEYS_JSON;

  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccount)),
    databaseURL: 'https://telegram-bots-379310.firebaseio.com' // Замените на URL вашего проекта Firebase
  });
}

// Получаем ссылку на Firestore базу данных
const db = admin.firestore();

const collectionRef = db.collection('t_book_club_accounts');
console.log(collectionRef)
const users = [
    { Name: 'John Doe', Email: 'john@example.com', Password: 'password1' },
    { Name: 'Jane Smith', Email: 'jane@example.com', Password: 'password2' },
  ];


  // Добавляем каждого пользователя в коллекцию
users.forEach((user) => {
    collectionRef.add(user)
  });
module.exports = db;
