// LoginModal.js

import React, { useState } from 'react';
import '../css/login.css';

const LoginModal = ({ isOpen, onClose }) => {
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationUsername, setRegistrationUsername] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [registrationPassword, setRegistrationPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic...
    console.log('Logged in with username:', username);
    onClose(); // Close the modal after successful login.
  };

  const handleRegistration = () => {
    // Handle registration logic...
    console.log('Registered with username:', registrationUsername);
    setRegistrationModalOpen(false); // Close the registration modal after successful registration.
  };

  return (
    <div className={`login-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>{isRegistrationModalOpen ? 'Join T-Book Club' : 'Login'}</h2>
        <label>
          Username:
          <input
            type="text"
            value={isRegistrationModalOpen ? registrationUsername : username}
            onChange={(e) =>
              isRegistrationModalOpen
                ? setRegistrationUsername(e.target.value)
                : setUsername(e.target.value)
            }
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={isRegistrationModalOpen ? registrationPassword : password}
            onChange={(e) =>
              isRegistrationModalOpen
                ? setRegistrationPassword(e.target.value)
                : setPassword(e.target.value)
            }
          />
        </label>
        {isRegistrationModalOpen && (
          <>
            <label>
              Email:
              <input
                type="email"
                value={registrationEmail}
                onChange={(e) => setRegistrationEmail(e.target.value)}
              />
            </label>
          </>
        )}
        <div className="buttons-container">
          {isRegistrationModalOpen ? (
            <>
              <button onClick={handleRegistration}>Join</button>
              <button onClick={() => setRegistrationModalOpen(false)}>Close</button>
            </>
          ) : (
            <>
              <button onClick={handleLogin}>Login</button>
              <button onClick={onClose}>Close</button>
            </>
          )}
        </div>
        <p>
          {!isRegistrationModalOpen && (
            <span className="not-member-link">Not a member of T-Book Club?</span>
          )}{" "}
          <span className="join-now-link" onClick={() => setRegistrationModalOpen(true)}>
            Join now!
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
