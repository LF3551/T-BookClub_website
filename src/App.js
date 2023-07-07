import React from 'react';
import logo from './logo.svg';
import './App.css';
import t_logo from './images/logo.png';

function App() {
  return (
    <div className="App" style={{ backgroundColor: 'blue' }}>
      <header className="App-header">
        <img src={t_logo} className="App-logo" alt="logo" />
        <h1>Welcome to the T-Book Club</h1>
        <p>Our Hall of Fame</p>
      </header>
    </div>
  );
}

export default App;