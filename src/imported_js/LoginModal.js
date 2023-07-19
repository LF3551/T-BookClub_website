// LoginModal.js

import React, { useState, useEffect } from 'react';
import '../css/login.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [registrationUsername, setRegistrationUsername] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [registrationPassword, setRegistrationPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic...
    console.log('Logged in with email:', email);
    console.log('Logged in with password:', password);
    onClose(); // Close the modal after successful login.
  };

  const handleRegistration = () => {
    // Handle registration logic...
    console.log('Registered with username:', username);
    console.log('Registered with email:', email);
    console.log('Registered with password:', password);
    setRegistrationModalOpen(false); // Close the registration modal after successful registration.
  };

  // Function to reset the input fields to their initial state
  const resetInputFields = () => {
    setUsername('');
    setPassword('');
    setRegistrationUsername('');
    setRegistrationEmail('');
    setRegistrationPassword('');
  };

  // Event listener for beforeunload to reset input fields on modal close or page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      resetInputFields();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Event listener for closing the modal to reset input fields
  useEffect(() => {
    if (!isOpen) {
      resetInputFields();
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
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </label>
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
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </label>
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