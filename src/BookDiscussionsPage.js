import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/BookDiscussionsPage.css';
import ImagePreviewModal from './imported_js/ImagePreviewModal'; 
import readEnvFile from './imported_js/readEnvFile';

// Заглушка для недоступного изображения
const placeholderImage = 'URL_К_ЗАГЛУШКЕ'; // Замените на URL изображения заглушки

function BookDiscussionsPage() {
  const [books, setBooks] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const serverurl = readEnvFile();
      const response = await fetch(serverurl);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching book discussions:', error);
    }
  };

  const handleImageClick = (image) => {
    setPreviewImage(image);
    setPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
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
                >
                  <div className="book-image-container book-discussions-image-container">
                    <img
                      src={book.Изображение || placeholderImage}
                      alt={`Image: ${book.Книга}`}
                      onClick={() => handleImageClick(book.Изображение)}
                      className="book-image book-discussions-image"
                    />
                  </div>
                </div>
              ))
            ))}
          </div>
        </div>
      </div>
      <Link to="/" className="book-discussions-back-button">Back</Link>

      {isPreviewOpen && (
        <ImagePreviewModal
          imageUrl={previewImage}
          onClose={handlePreviewClose}
        />
      )}
    </div>
  );
}

export default BookDiscussionsPage;
