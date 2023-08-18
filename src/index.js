import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import BookDiscussionsPage from './BookDiscussionsPage';
import reportWebVitals from './reportWebVitals';
import FutureEventsPage from './FutureEventsPage';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/book-discussions" element={<BookDiscussionsPage />} />
      <Route path="/future-events" element={<FutureEventsPage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
