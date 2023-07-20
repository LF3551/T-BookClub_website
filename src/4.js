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

const checkUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await admin.auth().getUserByEmail(email);
      // Если пользователь существует, аутентифицируйте его с предоставленным паролем
      await admin.auth().signInWithEmailAndPassword(email, password);
      console.log('User exists:', userCredential.toJSON());
      return true;
    } catch (error) {
      // Если возникла ошибка, пользователя с таким email и паролем не существует
      console.error('User does not exist or authentication failed:', error);
      return false;
    }
  };

// Вызов функции проверки пользователя
const email = 'user@example.com'; // Замените на email пользователя
const password = 'password123'; // Замените на пароль пользователя

checkUserWithEmailAndPassword(email, password);