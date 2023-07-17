import React, { useState, useEffect } from 'react';
import images from './images';
import { Link } from 'react-router-dom';
import './css/BookDiscussionsPage.css';

function BookDiscussionsPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('https://t-book-club-server-lf3551.vercel.app/hall-of-fame');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching book discussions:', error);
    }
  };

  const handleImageClick = (image) => {
    // Handle the image click here (if needed)
  };

  return (
    <div className="BookDiscussionsPage">
      <header className="App-header">
        <h1 className="welcome-text">
          <span className="club-name">Books we already discussed!</span>
        </h1>
      </header>
      <div className="discussion-content">
        <div className="book-list center-images">
          <div className="book-info-grid">
            {books.map((user, index) => (
              <div key={index} className="book-info-item">
                <div className="book-image-container">
                  <img
                    src={user['Книги_Авторы'][0].Изображение}
                    alt={`Image: ${user['Книги_Авторы'][0].Книга}`}
                    onClick={() => handleImageClick(user['Книги_Авторы'][0].Изображение)}
                    className="book-image" // Add the 'book-image' class for image styling
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Link to="/" className="back-button">Back</Link>
    </div>
  );
}

export default BookDiscussionsPage;

