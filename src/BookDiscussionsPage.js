import React from 'react';
import images from './images';
import { Link } from 'react-router-dom';

function BookDiscussionsPage() {
    return (
      <div className="BookDiscussionsPage">
        <header className="App-header">
          <img src={images.t_logo} className="App-logo" alt="logo" draggable="false" />
          <h1 className="welcome-text">
            <span className="club-name">Books we already discussed</span>
          </h1>
          <Link to="/" className="previous-discussions-button">
          Back
        </Link>
        </header>
        <div className="discussion-content">
          <h2 className="discussion-title">Past Book Discussions</h2>
          <p className="discussion-description">
            Here you can find the records of our previous book discussions. Feel free to explore and
            discover the insights and thoughts shared by our members.
          </p>
          {/* Add your book discussion content here */}
        </div>
      </div>
    );
  }
  
  export default BookDiscussionsPage;