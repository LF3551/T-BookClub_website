import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import images from './images';
import RanksTable from './RanksTable';

const rankImages = {};
for (let i = 1; i <= 10; i++) {
  rankImages[i] = images[`rank${i}`];
}
function Footer() {
  return (
<footer className="footer">
  <div className="footer-content">
    <div className="footer-buttons">
      <a href="https://www.linkedin.com/in/aleksei-aleinikov-78195911a/" target="_blank" rel="noopener noreferrer">
        <img src={images.linkedinbutton} alt="LinkedIn" />
      </a>
      <a href="https://www.instagram.com/a1eksey_gr/" target="_blank" rel="noopener noreferrer">
        <img src={images.instagrambutton} alt="Instagram" />
      </a>
      <a href="mailto:adk3551@gmail.com">
        <img src={images.emailbutton} alt="Email" />
      </a>
    </div>
    <p className="footer-text">
      &copy; {new Date().getFullYear()} T-Book Club. All rights reserved.
    </p>
  </div>
</footer>
  );
}
function App() {
  const [hallOfFameData, setHallOfFameData] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const aboutRanksRef = useRef(null);

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

  const fetchHallOfFameData = async () => {
    try {
      const response = await fetch('http://localhost:3006/hall-of-fame');
      const data = await response.json();
      setHallOfFameData(data);
    } catch (error) {
      console.error('Error fetching hall of fame data:', error);
    }
  };

  const handleBookButtonClick = (user) => {
    if (expandedUser === user) {
      setExpandedUser(null);
    } else {
      setExpandedUser(user);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const sortedData = hallOfFameData.sort((a, b) => b['Появления'] - a['Появления']);

  return (
    <div className="App">
      <header className="App-header">
        <img src={images.t_logo} className="App-logo" alt="logo" />
        <h1>Welcome to the T-Book Club</h1>
        <p>Our Hall of Fame</p>
        <div ref={aboutRanksRef} className="about-ranks-container">
          <img
            src={images.aboutRanksImage}
            alt="About Ranks"
            className="about-ranks-image"
            onClick={() => setShowAboutPopup((prevState) => !prevState)}
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
                      onClick={() => handleBookButtonClick(user)}
                      style={{ background: 'none', border: 'none', padding: '0' }}
                    >
                      <img src={images.bookbutton} alt="Book of user" width="30" />
                    </button>
                  </td>
                </tr>
                {expandedUser === user && (
                  <tr>
                  <td colSpan="3">
                    <ul className="book-list">
                      {user['Книги_Авторы'].map((bookAuthor, index) => (
                        <li key={index} className={`book-info ${expandedUser === user ? 'expanded' : ''}`}>
                          <div className="book-info-item">
                            <div className="book-details">
                              <span className="book-title">Book: {bookAuthor.Книга}</span>
                              <span className="book-author">Author: {bookAuthor.Автор}</span>
                            </div>
                            <div className="book-image-container">
                              <img
                                src={bookAuthor.Изображение}
                                alt={`Image: ${bookAuthor.Книга}`}
                                onClick={() => handleImageClick(bookAuthor.Изображение)}
                              />
                            </div>
                          </div>
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

        {selectedImage && (
          <div className="image-modal" onClick={() => setSelectedImage(null)}>
            <div className="image-modal-content">
              <img src={selectedImage} alt="Selected Image" />
            </div>
          </div>
        )}
      </header>
      <Footer />
    </div>
  );
}

export default App;


