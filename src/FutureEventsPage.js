import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/FutureEventsPage.css';
import readEnvFile2 from './imported_js/readEnvFile2';


function FutureEventsPage() {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetchEvents();
      }, []);
    const fetchEvents = async () => {
        try {
          const serverurl = `${readEnvFile2()}/future_events`; // Добавьте соответствующий путь к вашему серверу
          console.log(serverurl)
          const response = await fetch(serverurl);
          const data = await response.json();
          console.log(data)
          setEvents(data);
        } catch (error) {
          console.error('Error fetching future events:', error);
        }
      };
    
      return (
        <div className="future-events-page">
          <header className="app-header">
            <h1 className="welcome-text" style={{ color: 'white' }}>
              <span className="club-name">Future Events</span>
            </h1>
          </header>
          <div className="events-content">
            {events.map((event, index) => (
              <div key={index} className="event-item">
                <h2>{event.Date}</h2>
                <ul>
                  {event.Events.map((e, idx) => (
                    <li key={idx}>
                      <strong>{e.Title}</strong> - {e.Discussion} ({e.Language})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link to="/" className="future-events-back-button">Back</Link>
        </div>
      );
    }

export default FutureEventsPage;