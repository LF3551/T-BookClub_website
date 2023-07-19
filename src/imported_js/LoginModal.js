import React, { useState, useEffect } from 'react';
import '../css/login.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [joinEmailError, setJoinEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = () => {
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation for email and password fields
    if (!email.trim() || !password.trim()) {
      setLoginError(true);
      setJoinEmailError(false);
    } else if (!emailPattern.test(email)) {
      setLoginError(true);
      setJoinEmailError(true);
      console.log('Invalid email format');
    } else {
      setLoginError(false);
      setJoinEmailError(false);
      setPasswordError(false);
      // Handle login logic here...
      console.log('Logged in with email:', email);
      console.log('Logged in with password:', password);
      onClose(); // Close the modal after successful login.
    }
  };

  const handleRegistration = () => {
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

    // All validations passed, handle registration logic
    console.log('Registered with username:', username);
    console.log('Registered with email:', email);
    console.log('Registered with password:', password);
    setRegistrationModalOpen(false); // Close the registration modal after successful registration.
  };

  // Function to reset the input fields to their initial state
  const resetInputFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  // Function to handle modal close and reset input fields and error states
  const handleCloseModal = () => {
    resetInputFields();
    setLoginError(false);
    setJoinEmailError(false);
    setNameError(false);
    setPasswordError(false);
    onClose();
  };

  // Event listener for beforeunload to reset input fields on modal close or page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      handleCloseModal();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Event listener for closing the modal to reset input fields
  useEffect(() => {
    if (!isOpen) {
      handleCloseModal();
    }
  }, [isOpen]);

  return (
    <div className={`login-modal ${isOpen ? 'open' : ''}`}>
      <div className="join-modal">
        <div className="modal-content">
          <h2>{isRegistrationModalOpen ? 'Join T-Book Club' : 'Login'}</h2>
          {isRegistrationModalOpen ? (
            <>
              <label>
                Name:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                />
              </label>
              {nameError && <p className="field-error">Please enter your name.</p>}
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </label>
              {joinEmailError && (
                <p className={`field-error ${email.trim() === '' ? 'small-error' : ''}`}>
                  {email.trim() === '' ? 'Please enter your email.' : 'Please enter a valid email address.'}
                </p>
              )}
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </label>
              {passwordError && (
                <p className="field-error">
                  {password.trim() === '' ? 'Please enter your password.' : 'Password must be at least 8 characters long.'}
                </p>
              )}
            </>
          ) : (
            <>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </label>
              {loginError && (
                <p className={`login-error ${joinEmailError || passwordError ? 'login-error-small' : ''}`}>
                  {joinEmailError
                    ? 'Please enter a valid email address'
                    : passwordError
                    ? 'Password must be at least 8 characters long'
                    : 'Please enter your email and password.'}
                </p>
              )}
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </label>
              {passwordError && (
                <p className="field-error">
                  {password.trim() === '' ? 'Please enter your password.' : 'Password must be at least 8 characters long.'}
                </p>
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
                <button onClick={handleLogin}>Login</button>
                <button onClick={onClose}>Close</button>
              </>
            )}
          </div>
          <p>
            {isRegistrationModalOpen ? (
              <>
                <span className="already-member-text">Already on T-Book Club? </span>
                <span className="already-member-link" onClick={() => setRegistrationModalOpen(false)}>
                  Sign in
                </span>
              </>
            ) : (
              <>
                <span className="not-member-link">Not a member of T-Book Club? </span>
                <span className="join-now-link" onClick={() => setRegistrationModalOpen(true)}>
                  Join now!
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
