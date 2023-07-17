import React from 'react';
import images from '../images';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-buttons">
          <div className="connect-wrapper">
            <p className="connect-text">Let's Connect:</p>
            <div className="buttons-container">
              <a href="https://www.linkedin.com/in/aleksei-aleinikov-78195911a/" target="_blank" rel="noopener noreferrer">
                <img className="button-linkedin" src={images.linkedinbutton} alt="LinkedIn" draggable="false" />
              </a>
              <a href="https://www.instagram.com/a1eksey_gr/" target="_blank" rel="noopener noreferrer">
                <img className="button-instagram" src={images.instagrambutton} alt="Instagram" draggable="false" />
              </a>
              <a href="mailto:adk3551@gmail.com">
                <img className="button-email" src={images.emailbutton} alt="Email" draggable="false" />
              </a>
            </div>
          </div>
        </div>
        <p className="footer-text">
          &copy; {new Date().getFullYear()} T-Book Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
