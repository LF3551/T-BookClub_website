import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import images from './images';
import './css/footer.css';
import './css/buttons.css';
import './css/login.css';
import RanksTable from './imported_js/RanksTable';
import LoginModal from './imported_js/LoginModal';
import readEnvFile from './imported_js/readEnvFile';
import Footer from './imported_js/Footer';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import handleLogin from './imported_js/loginService';
import library from './images/library.png';
import calendar from './images/calendar.png';

function shuffleArray(array) {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}


const rankImages = {};
for (let i = 1; i <= 10; i++) {
  rankImages[i] = images[`rank${i}`];
}

function App() {
  const [hallOfFameData, setHallOfFameData] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [expandedUser, setExpandedUser] = useState(null);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const aboutRanksRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [loggedInUsername, setLoggedInUsername] = useState(localStorage.getItem('loggedInUsername') || '');
  const [username, setUsername] = useState('');
  
  const handleLogin = () => {
    // Открываем модальное окно для логина
    setShowLoginModal(true);
  };
  
  const handleLogout = () => {
    // Выход из системы
    setIsLoggedIn(false);
    setLoggedInUsername('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUsername');
  };
  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setLoggedInUsername(username);
    setShowLoginModal(false);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedInUsername', username);
};
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // Реф для модального окна для обработки кликов вне модального окна (закрытие при клике вне окна).
  const modalRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLoginModal(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
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
    const fetchData = async () => {
      try {
        const serverurl = readEnvFile();
        const response = await fetch(serverurl);
        const data = await response.json();
        const sortedAndShuffledData = [];
        const maxRank = 10;
        for (let i = maxRank; i >= 1; i--) {
          const usersOfThisRank = data.filter(user => user['Появления'] === i);
          sortedAndShuffledData.push(...shuffleArray(usersOfThisRank));
        }

        setHallOfFameData(sortedAndShuffledData);
      } catch (error) {
        console.error('Error fetching hall of fame data:', error);
      }
    };

    fetchData();
}, []);



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


  return (
    <div className="App">
      <header className="App-header">
        <img src={images.t_logo} className="App-logo" alt="logo" draggable="false" />
      {/* Модальное окно для логина */}
      {isLoggedIn ? (
        <div className="greeting-container">
        <span className="greeting-text">Hello, {loggedInUsername}!</span>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
     </div>
      ) : (
        <>
          {/* Пользователь не залогинен, показываем кнопку Login */}
          {/* <button onClick={handleLogin}>Login</button> */}   
          {/* тут кнопка на будущее в доработке пока там есть все и логин и регистрация но на почту отбивка по токенам приходит с ошибкой
          и я не нашел нужного провайдера почты .. но если отключить токены то пользователь сможет авторизоваться 
          в будущем доделаю */}
        </>
      )}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLoginSuccess={handleLoginSuccess} />

        <h1 className="welcome-text"><span className="club-name">Welcome to the T-Book Club</span></h1>
        <div className="buttons-container">
        <Link to="/book-discussions" className="previous-discussions-button"><div className="link-content"><img src={library} alt="Library Icon" className="library-icon" />Discussed books</div></Link>
        <Link to="/future-events" className="previous-discussions-button"><div className="link-content"><img src={calendar} alt="Calendar Icon" className="library-icon" />Future events</div></Link>
        </div>
        <p>Our Hall of Fame</p>
        <div ref={aboutRanksRef} className="about-ranks-container">
          <img src={images.aboutRanksImage} alt="About Ranks" className="about-ranks-image" draggable="false" onClick={() => setShowAboutPopup((prevState) => !prevState)} ref={aboutRanksRef} />
        </div>

        <table>
          <thead><tr><th>Rank</th><th className="speaker-header">Speaker</th><th><div className="column-header"><div className="header-content">Books</div></div></th></tr></thead>
          <tbody>
          {hallOfFameData.map((user, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>
                    <img src={rankImages[user['Появления']]} alt={`Rank ${user['Появления']}`} className="rank-icon" width="50" draggable="false" />
                  </td>
                  <td className="speaker-column">{user['Пользователь']}</td>
                  <td>
                    <button onClick={() => handleBookButtonClick(user)} className={`book-button ${expandedUser === user ? 'expanded' : ''}`} >
                      <img src={images.bookbutton} alt="Book of user" width="30" draggable="false" />
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
                              <div className="book-details"><span className="book-title">Book: {bookAuthor.Книга}</span><span className="book-author">Author: {bookAuthor.Автор}</span>
                              <div className="book-links">
                              {bookAuthor.Видеоссылка && (
                                  <a href={bookAuthor.Видеоссылка} target="_blank" rel="noopener noreferrer" className="book-video-link">Watch video</a>
                              )}</div>
                                {bookAuthor.Презентация && (
        <a href={bookAuthor.Презентация} target="_blank" rel="noopener noreferrer" className="book-presentation-link">Download</a>
    )}
    </div>
                              <div className="book-image-container"><img src={bookAuthor.Изображение} alt={`Image: ${bookAuthor.Книга}`} onClick={() => handleImageClick(bookAuthor.Изображение)}/></div>
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
          <div className="about-popup-container"><div className="about-popup"><div className="popup-content"><div className="about-popup-content"><RanksTable /></div></div></div></div>
        )}

        {selectedImage && (
          <div className="image-modal" onClick={() => setSelectedImage(null)}><div className="image-modal-content"><img src={selectedImage} alt="Selected Image" /></div></div>
        )}
      </header>
      <Footer />
    </div>
  );
}

export default App;
