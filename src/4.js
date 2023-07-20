import firebase from 'firebase/app';
import 'firebase/auth';

// Настройте конфигурацию Firebase с использованием ключей из вашего проекта Firebase
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  // Другие настройки Firebase...
};

// Инициализируйте Firebase
firebase.initializeApp(firebaseConfig);

// Функция для проверки наличия пользователя с email и паролем
const checkUserWithEmailAndPassword = async (email, password) => {
  try {
    // Аутентификация с email и паролем
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    
    // Если аутентификация успешна, пользователь существует
    const user = userCredential.user;
    console.log('User exists:', user);
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