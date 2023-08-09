import axios from 'axios';

const handleLogin = async (email, password, setLoginError,setErrorMessage, setJoinEmailError, setPasswordError, setIsEmailAndPasswordValid, setIsLoggedIn, onLoginSuccess, setLoggedInUsername, onClose) => {
  // Regular expression for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Reset error states
  setLoginError(false);
  setJoinEmailError(false);
  setPasswordError(false);
  setIsEmailAndPasswordValid(true);

  // Validation for email and password fields
  if (!email.trim() && !password.trim()) {
    setIsEmailAndPasswordValid(false);
    setLoginError(true);
    setJoinEmailError(true);
    setPasswordError(true);
    setErrorMessage('Please enter your email and password.');
    return;
  } else if (!email.trim()) {
    setIsEmailAndPasswordValid(false);
    setLoginError(true);
    setJoinEmailError(true);
    setErrorMessage('Please enter your email.');
    return;
  } else if (!password.trim()) {
    setIsEmailAndPasswordValid(false);
    setLoginError(true);
    setPasswordError(true);
    setErrorMessage('Please enter your password.');
    return;
  } else if (!emailPattern.test(email)) {
    setIsEmailAndPasswordValid(false);
    setLoginError(true);
    setJoinEmailError(true);
    setErrorMessage('Invalid email format.');
    return;
  }

  try {
    const response = await axios.post(process.env.REACT_APP_LOGIN_URL, {
      email: email,
      password: password,
    });

    if (response.data.success) {
      // Аутентификация успешна
      setIsLoggedIn(true);
      onLoginSuccess(response.data.name);
      setLoggedInUsername(response.data.name); // Assuming the server returns the username upon successful login
      
      onClose(); // Закрываем модальное окно после успешной аутентификации
      // Здесь вы можете выполнить необходимые действия для авторизации пользователя в React приложении.
    } else {
      // Аутентификация не удалась, отображаем сообщение об ошибке
      setErrorMessage('Invalid email or password'); // Здесь можно использовать сообщение об ошибке с сервера, если оно есть
      setLoginError(true);
    }
  } catch (error) {
    console.error('Login error:', error);
    // Обработка ошибок, если запрос к серверу не удался
    setErrorMessage('Login failed. Please try again later.');
    setLoginError(true);
  }
};

export default handleLogin;