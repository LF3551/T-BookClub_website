import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import BookDiscussionsPage from './BookDiscussionsPage';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/book-discussions" element={<BookDiscussionsPage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
