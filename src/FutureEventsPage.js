import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/FutureEventsPage.css';
import readEnvFile2 from './imported_js/readEnvFile2';
import enImage from './images/en.png';
import ruImage from './images/ru.png';
import library from './images/library.png';
import calendar from './images/calendar.png';

function FutureEventsPage() {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetchEvents();
      }, []);
    const fetchEvents = async () => {
        try {
            const serverurl2 = readEnvFile2();
            console.log(serverurl2)
            // put this serverurl2
            const response = await fetch("https://t-book-club-server-lf3551.vercel.app/future_events");
         
            const data = await response.json();
            console.log(data)
            setEvents(data);
        } catch (error) {
          console.error('Error fetching future events:', error);
        }
      };
      
    const currentDate = new Date();
    const stringToDate = (dateString) => {
        const [day, month, year] = dateString.split('.');
        return new Date(year, month - 1, day);
    }
    
    // Сначала сортировка всех событий
    const sortedEvents = [...events].sort((a, b) => stringToDate(a.Date) - stringToDate(b.Date));
    
    // Затем фильтрация для будущих событий
    const futureEvents = sortedEvents.filter(event => stringToDate(event.Date) >= currentDate);
    
    const pastEvents = sortedEvents.filter(event => stringToDate(event.Date) < currentDate).sort((a, b) => stringToDate(b.Date) - stringToDate(a.Date));
    const languageToImage = {
        en: enImage,
        ru: ruImage
      };
      return (
        <div className="future-events-page">
          <header className="app-header">
            <h1 className="welcome-text" style={{ color: 'white' }}><span className="club-name">Future Events</span></h1>
          </header>
          <div className="events-content" style={{ color: 'white'  }}>
            {futureEvents.map((event, index) => (
                <div key={index} className="event-item" style={{ color: 'white' }}>
                    <h2 style={{ color: 'white', textAlign: 'center', width: '100%' }}>{event.Date}</h2>
                    <table className="event-table">
                        <tbody>
                            {event.Events.map((e, idx) => (
                                <tr key={idx}>
                                    <td className="event-title"><strong>{e.Title}</strong><div className="icon-container"><img src={calendar} alt="Calendar Icon" className="calendar-icon" /></div></td>
                                    <td className="event-discussion">{e.Discussion.split(';').map((discussionItem, dIdx) => (<div key={dIdx} className="discussion-item">{discussionItem.trim()}</div>))}</td>
                                    <td className="event-language"><img src={languageToImage[e.Language]} alt={e.Language} className="language-icon" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
        <Link to="/" className="future-events-back-button">Back</Link>
        <h2 className="welcome-text" style={{ color: 'white' , marginTop: '2cm'}}><span className="club-name">Past Events</span></h2>
        <div className="events-content" style={{ color: 'white' }}>
    {pastEvents.map((event, index) => (
        <div key={index} className="event-item" style={{ color: 'white' }}>
            <h2 style={{ color: 'white', textAlign: 'center', width: '100%' }}>{event.Date}</h2>
            <table className="event-table">
                <tbody>
                    {event.Events.map((e, idx) => (
                        <tr key={idx}>
                            <td className="event-title"><strong>{e.Title}</strong><div className="icon-container"><img src={library} alt="Library Icon" className="library-icon" /></div></td>
                            <td className="event-discussion">{e.Discussion.split(';').map((discussionItem, dIdx) => (<div key={dIdx} className="discussion-item">{discussionItem.trim()}</div>))}</td>
                            <td className="event-language"><img src={languageToImage[e.Language]} alt={e.Language} className="language-icon" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ))}
</div>
          <Link to="/" className="future-events-back-button">Back</Link>
        </div>
      );
    }

export default FutureEventsPage;