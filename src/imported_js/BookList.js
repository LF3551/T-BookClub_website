import React from 'react';

const BookList = ({ user, expandedUser, handleImageClick }) => {
  return (
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
  );
};

export default BookList;
