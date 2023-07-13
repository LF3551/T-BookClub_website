import React, { useEffect, useState } from 'react';
import './App.css';
import t_logo from './images/logo.png';

function App() {
  const [hallOfFameData, setHallOfFameData] = useState([]);

  useEffect(() => {
    fetchHallOfFameData();
  }, []);

  const fetchHallOfFameData = async () => {
    try {
      const response = await fetch('http://localhost:3006/hall-of-fame'); // Use the server's URL here
      const data = await response.json();
      setHallOfFameData(data);
    } catch (error) {
      console.error('Error fetching hall of fame data:', error);
    }
  };

  return (
    <div className="App" style={{ backgroundColor: 'blue' }}>
      <header className="App-header">
        <img src={t_logo} className="App-logo" alt="logo" />
        <h1>Welcome to the T-Book Club!</h1>
        <p>Our Hall of Fame</p>

        {/* Display hall of fame data */}
        {hallOfFameData.map((user, index) => (
          <div key={index}>
            <h3>{user.Пользователь}</h3>
            <p>Идентификатор: {user.Идентификатор}</p>
            <p>Появления: {user.Появления}</p>
            <ul>
              {user.Книги_Авторы.map((bookAuthor, index) => (
                <li key={index}>
                  <span>Книга: {bookAuthor.Книга}</span>
                  <span>Автор: {bookAuthor.Автор}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;