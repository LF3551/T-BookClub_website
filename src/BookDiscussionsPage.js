import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/BookDiscussionsPage.css';

// Заглушка для недоступного изображения
const placeholderImage = 'URL_К_ЗАГЛУШКЕ'; // Замените на URL изображения заглушки

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
    <div className="book-discussions-page">
      <header className="app-header">
        <h1 className="welcome-text">
          <span className="club-name">Books we already discussed!</span>
        </h1>
      </header>
      <div className="discussion-content">
        <div className="book-list book-discussions-center-images">
          <div className="book-info-grid book-discussions-grid">
            {books.map((user, userIndex) => (
              user['Книги_Авторы'].map((book, bookIndex) => (
                <div key={`${userIndex}-${bookIndex}`} className="book-info-item book-discussions-item">
                  <div className="book-image-container book-discussions-image-container">
                    <img
                      src={book.Изображение || placeholderImage}
                      alt={`Image: ${book.Книга}`}
                      onClick={() => handleImageClick(book.Изображение)}
                      className="book-image book-discussions-image" // Add the 'book-image' class for image styling
                    />
                  </div>
                </div>
              ))
            ))}
          </div>
        </div>
      </div>
      <Link to="/" className="book-discussions-back-button">Back</Link>
    </div>
  );
}

export default BookDiscussionsPage;
