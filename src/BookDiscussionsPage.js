import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/BookDiscussionsPage.css';
import ImagePreviewModal from './imported_js/ImagePreviewModal'; 

// Заглушка для недоступного изображения
const placeholderImage = 'URL_К_ЗАГЛУШКЕ'; // Замените на URL изображения заглушки

function BookDiscussionsPage() {
  const [books, setBooks] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

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

  const handleImageMouseOver = (event, image) => {
    setPreviewVisible(true);
    setCursorPosition({ x: event.clientX, y: event.clientY });
    setPreviewImage(image);
  };

  const handleImageMouseOut = () => {
    setPreviewVisible(false);
  };

  return (
    <div className="book-discussions-page">
      <header className="app-header">
        <h1 className="welcome-text" style={{ color: 'white' }}>
          <span className="club-name">Books we already discussed!</span>
        </h1>
      </header>
      <div className="discussion-content">
        <div className="book-list book-discussions-center-images">
          <div className="book-info-grid book-discussions-grid">
            {books.map((user, userIndex) => (
              user['Книги_Авторы'].map((book, bookIndex) => (
                <div
                  key={`${userIndex}-${bookIndex}`}
                  className="book-info-item book-discussions-item"
                  onMouseOver={(e) => handleImageMouseOver(e, book.Изображение)}
                  onMouseOut={handleImageMouseOut}
                >
                  <div className="book-image-container book-discussions-image-container">
                    <img
                      src={book.Изображение || placeholderImage}
                      alt={`Image: ${book.Книга}`}
                      onClick={() => handleImageClick(book.Изображение)}
                      className="book-image book-discussions-image"
                    />
                    {previewVisible && previewImage === book.Изображение && (
                      <div
                        className="image-modal"
                        style={{ top: cursorPosition.y, left: cursorPosition.x }}
                      >
                        <img src={book.Изображение || placeholderImage} alt={`Image: ${book.Книга}`} />
                      </div>
                    )}
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
