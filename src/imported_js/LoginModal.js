import React, { useState, useEffect } from 'react';
import '../css/login.css';
import 'firebase/auth';
import axios from 'axios';
import handleLogin from './loginService';


const LoginModal = ({ isOpen, onClose,onLoginSuccess }) => {
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [joinEmailError, setJoinEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailAndPasswordValid, setIsEmailAndPasswordValid] = useState(false);
  // State to keep track of user authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  useEffect(() => {
    // Check if the user is already logged in (using localStorage)
    const isLoggedInLocalStorage = localStorage.getItem('isLoggedIn');
    const loggedInUsernameLocalStorage = localStorage.getItem('loggedInUsername');

    if (isLoggedInLocalStorage === 'true' && loggedInUsernameLocalStorage) {
      setIsLoggedIn(true);
      setLoggedInUsername(loggedInUsernameLocalStorage);
    }
  }, []);

  
  const handleLogout = () => {
    // Logout logic
    setIsLoggedIn(false);
    setLoggedInUsername('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUsername');
  };
  

  const handleRegistration = async () => {
    // Reset all error states before validating
    setNameError(false);
    setJoinEmailError(false);
    setPasswordError(false);

    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation for name field
    if (!username.trim()) {
      setNameError(true);
      return;
    }

    // Validation for email field
    if (!email.trim() || !emailPattern.test(email)) {
      setJoinEmailError(true);
      return;
    }

    // Validation for password field
    if (!password.trim() || password.length < 8) {
      setPasswordError(true);
      return;
    }
    try {
      const response = await axios.post(process.env.REACT_APP_REGISTER_URL, {
        name: username,
        email: email,
        password: password,
      });
      setRegistrationModalOpen(false); // Закрываем модальное окно после успешной регистрации
    } catch (error) {
      console.error('Registration error:', error);
    }
    setRegistrationModalOpen(false); // Close the registration modal after successful registration.
  };

  const resetInputFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleCloseModal = () => {
    resetInputFields();
    setLoginError(false);
    setJoinEmailError(false);
    setNameError(false);
    setPasswordError(false);
    onClose();
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      handleCloseModal();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      handleCloseModal();
    }
  }, [isOpen]);

  const onLoginClick = () => {
    handleLogin(email, password, setLoginError, setJoinEmailError,setErrorMessage, setPasswordError, setIsEmailAndPasswordValid, setIsLoggedIn, onLoginSuccess, setLoggedInUsername, onClose);
};
  return (
    <div className={`login-modal ${isOpen ? 'open' : ''}`}>
      <div className="join-modal">
        <div className="modal-content">
          <h2>{isRegistrationModalOpen ? 'Join T-Book Club' : 'Login'}</h2>
          {isRegistrationModalOpen ? (
            <>
              <label>Name: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your name" /></label>
              {nameError && <p className="field-error">Please enter your name.</p>}
              <label>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" /></label>
              {joinEmailError && (
                <p className={`field-error ${email.trim() === '' ? 'small-error' : ''}`}>{email.trim() === '' ? 'Please enter your email.' : 'Please enter a valid email address.'}</p>
              )}
              <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"/></label>
              {passwordError && (
                <p className="field-error">{password.trim() === '' ? 'Please enter your password.' : 'Password must be at least 8 characters long.'}</p>
              )}
            </>
          ) : (
            <>
              <label>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/></label>
              {loginError && (
                <p className={`login-error ${joinEmailError || passwordError ? 'login-error-small' : ''}`}>
                {joinEmailError
                  ? 'Please enter a valid email address'
                  : passwordError
                  ? 'Password must be at least 8 characters long'
                  : errorMessage}
              </p>
              )}
              <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"/></label>
              {passwordError && (
                <p className="field-error">{password.trim() === '' ? 'Please enter your password.' : 'Password must be at least 8 characters long.'}</p>
              )}
            </>
          )}
          <div className="buttons-container">
            {isRegistrationModalOpen ? (
              <>
                <button onClick={handleRegistration}>Join</button>
              </>
            ) : (
              <>
                <button onClick={onLoginClick}>Login</button>
                <button onClick={onClose}>Close</button>
              </>
            )}
          </div>
          <p>
            {isRegistrationModalOpen ? (
              <>
                <span className="already-member-text">Already on T-Book Club? </span>
                <span className="already-member-link" onClick={() => setRegistrationModalOpen(false)}> Sign in </span>
              </>
            ) : (
              <>
                <span className="not-member-link">Not a member of T-Book Club? </span>
                <span className="join-now-link" onClick={() => setRegistrationModalOpen(true)}> Join now! </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
