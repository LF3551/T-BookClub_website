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
            const serverurl2 = readEnvFile2();
            console.log(serverurl2)
            const response = await fetch(serverurl2);
         
            const data = await response.json();
            console.log(data)
            setEvents(data);
        } catch (error) {
          console.error('Error fetching future events:', error);
        }
      };
    const currentDate = new Date();
    const sortedEvents = [...events].sort((a, b) => {
        const dateA = new Date(a.Date);
        const dateB = new Date(b.Date);
        return dateB - dateA;  // Это упорядочит события по убыванию даты.
    });
    const pastEvents = sortedEvents.filter(event => new Date(event.Date) < currentDate);
    const futureEvents = sortedEvents.filter(event => new Date(event.Date) >= currentDate);

    
      return (
        <div className="future-events-page">
          <header className="app-header">
            <h1 className="welcome-text" style={{ color: 'white' }}>
              <span className="club-name">Future Events</span>
            </h1>
          </header>
          <div className="events-content" style={{ color: 'white' }}>
            {futureEvents.map((event, index) => (
                <div key={index} className="event-item" style={{ color: 'white' }}>
                    <h2 style={{ color: 'white' }}>{event.Date}</h2>
                    <ul style={{ color: 'white' }}>
                        {event.Events.map((e, idx) => (
                            <li key={idx} style={{ color: 'white' }}>
                                <strong style={{ color: 'white' }}>{e.Title}</strong> - {e.Discussion} ({e.Language})
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