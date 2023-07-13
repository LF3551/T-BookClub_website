import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import t_logo from './images/logo.png';

function App() {
  const [hallOfFameData, setHallOfFameData] = useState([]);
  const [expandedUsers, setExpandedUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupUser, setPopupUser] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    fetchHallOfFameData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchHallOfFameData = async () => {
    try {
      const response = await fetch('http://localhost:3006/hall-of-fame');
      const data = await response.json();
      setHallOfFameData(data);
    } catch (error) {
      console.error('Error fetching hall of fame data:', error);
    }
  };

  const toggleUserExpansion = (user) => {
    if (expandedUsers.includes(user)) {
      setExpandedUsers((prevState) => prevState.filter((u) => u !== user));
    } else {
      setExpandedUsers((prevState) => [...prevState, user]);
    }
  };

  const togglePopup = (user) => {
    if (showPopup && popupUser === user) {
      setShowPopup(false);
      setPopupUser(null);
    } else {
      setShowPopup(true);
      setPopupUser(user);
    }
  };

  const sortedData = hallOfFameData.sort((a, b) => b['Появления'] - a['Появления']);

  return (
    <div className="App" style={{ backgroundColor: 'blue' }}>
      <header className="App-header">
        <img src={t_logo} className="App-logo" alt="logo" />
        <h1>Welcome to the T-Book Club!</h1>
        <p>Our Hall of Fame</p>

        <table>
          <thead>
            <tr>
              <th>Speaking Rank</th>
              <th>Speaker</th>
              <th>Toggle с книгами</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((user, index) => (
              <tr key={index}>
                <td>{user['Появления']}</td>
                <td>{user['Пользователь']}</td>
                <td>
                  <button onClick={() => togglePopup(user)}>Toggle</button>
                </td>
                <td>
                  {expandedUsers.includes(user) && (
                    <ul className="book-list">
                      {user['Книги_Авторы'].map((bookAuthor, index) => (
                        <li key={index}>
                          <span className="book-title">Book: {bookAuthor.Книга}</span>
                          <span className="book-author">Author: {bookAuthor.Автор}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showPopup && (
          <div className="popup-container">
            <div ref={popupRef} className="popup">
              {popupUser && (
                <div className="popup-content">
                  <p className="popup-user">{popupUser['Пользователь']}</p>
                  <ul className="book-list">
                    {popupUser['Книги_Авторы'].map((bookAuthor, index) => (
                      <li key={index}>
                        <span className="book-title">Book: {bookAuthor.Книга}</span>
                        <span className="book-author">Author: {bookAuthor.Автор}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;


