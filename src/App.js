import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import images from './images';
import RanksTable from './RanksTable';

const rankImages = {};
for (let i = 1; i <= 10; i++) {
  rankImages[i] = images[`rank${i}`];
}

function App() {
  const [hallOfFameData, setHallOfFameData] = useState([]);
  const [expandedUsers, setExpandedUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupUser, setPopupUser] = useState(null);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const popupRef = useRef(null);
  const aboutRanksRef = useRef(null);
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [popupOffsetX, setPopupOffsetX] = useState(0);
  const [popupOffsetY, setPopupOffsetY] = useState(0);

  useEffect(() => {
    fetchHallOfFameData();
  }, []);

  useEffect(() => {
    const handleClickOutsideAboutRanks = (event) => {
      if (aboutRanksRef.current && !aboutRanksRef.current.contains(event.target)) {
        setShowAboutPopup(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setShowAboutPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideAboutRanks);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideAboutRanks);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [aboutRanksRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (popupRef.current && !popupRef.current.contains(event.target)) &&
        (aboutRanksRef.current && !aboutRanksRef.current.contains(event.target))
      ) {
        setShowPopup(false);
        setShowAboutPopup(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setShowPopup(false);
        setShowAboutPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [popupRef, aboutRanksRef]);

  const fetchHallOfFameData = async () => {
    try {
      const response = await fetch('http://localhost:3006/hall-of-fame');
      const data = await response.json();
      setHallOfFameData(data);
    } catch (error) {
      console.error('Error fetching hall of fame data:', error);
    }
  };

  const togglePopup = (user, event) => {
    if (showPopup && popupUser === user) {
      setShowPopup(false);
      setPopupUser(null);
    } else {
      if (event) {
        const offsetX = event.clientX - event.target.getBoundingClientRect().width - 200;
        const offsetY = event.clientY - event.target.getBoundingClientRect().height + 102;
        setPopupOffsetX(offsetX);
        setPopupOffsetY(offsetY);
      }
      setShowPopup(true);
      setShowAboutPopup(false);
      setPopupUser(user);
    }
  };

  const handleAboutRanksClick = () => {
    setShowAboutPopup((prevState) => !prevState);
    setShowPopup(false);
    setPopupUser(null);
  };

  const sortedData = hallOfFameData.sort((a, b) => b['Появления'] - a['Появления']);

  return (
    <div className="App" style={{ backgroundColor: 'blue' }}>
      <header className="App-header">
        <img src={images.t_logo} className="App-logo" alt="logo" />
        <h1>Welcome to the T-Book Club!</h1>
        <p>Our Hall of Fame</p>
        <div ref={aboutRanksRef} className="about-ranks-container">
          <img
            src={images.aboutRanksImage}
            alt="About Ranks"
            className="about-ranks-image"
            onClick={handleAboutRanksClick}
            ref={aboutRanksRef}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th className="speaker-header">Speaker</th>
              <th>
                <div className="column-header">
                  <div className="header-content">Books</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((user, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>
                    <img
                      src={rankImages[user['Появления']]}
                      alt={`Rank ${user['Появления']}`}
                      className="rank-icon"
                      width="50"
                    />
                  </td>
                  <td className="speaker-column">{user['Пользователь']}</td>
                  <td>
                    <button
                      onClick={(event) => togglePopup(user, event)}
                      style={{ background: 'none', border: 'none', padding: '0' }}
                    >
                      <img src={images.bookbutton} alt="Book of user" width="30" />
                    </button>
                  </td>
                </tr>
                {expandedUsers.includes(user) && (
                  <tr>
                    <td colSpan="3">
                      <ul className="book-list">
                        {user['Книги_Авторы'].map((bookAuthor, index) => (
                          <li key={index}>
                            <span className="book-title">Author: {bookAuthor.Автор}</span>
                            <span className="book-author">Book: {bookAuthor.Книга}</span>
                            <span className="book-image">Image: {bookAuthor.Изображение}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {showPopup && popupUser && (
          <div className="popup-container" style={{ top: cursorY + popupOffsetY, left: cursorX + popupOffsetX }}>
            <div ref={popupRef} className="popup" style={{ maxWidth: '300px' }}>
              <div className="popup-content">
                <p className="popup-user">{popupUser['Пользователь']}</p>
                <ul className="book-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {popupUser['Книги_Авторы'].map((bookAuthor, index) => (
                    <li key={index}>
                      <span className="book-title">Author: {bookAuthor.Автор}</span>
                      <span className="book-author">Book: {bookAuthor.Книга}</span>
                      <span className="book-image">Image: {bookAuthor.Изображение}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {showAboutPopup && (
          <div className="about-popup-container">
            <div className="about-popup">
              <div className="popup-content">
                <div className="about-popup-content">
                  <RanksTable />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

