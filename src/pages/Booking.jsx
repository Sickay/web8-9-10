// src/pages/Booking.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import BookingForm from '../components/BookingForm';
import { movies } from '../data/movies';
import '../styles/Booking.css';

const Booking = () => {
  const { movieId, sessionId } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [session, setSession] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  // Find movie and session when component mounts
  useEffect(() => {
    const foundMovie = movies.find(m => m.id === parseInt(movieId));
    
    if (foundMovie) {
      setMovie(foundMovie);
      const foundSession = foundMovie.sessions.find(
        s => s.id === parseInt(sessionId)
      );
      
      if (foundSession) {
        setSession(foundSession);
      } else {
        // Session not found, navigate back to home
        navigate('/');
      }
    } else {
      // Movie not found, navigate back to home
      navigate('/');
    }
  }, [movieId, sessionId, navigate]);
  
  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
  };
  
  const handleProceedToBooking = () => {
    if (selectedSeats.length > 0) {
      setShowForm(true);
    }
  };
  
  const goBack = () => {
    navigate('/');
  };
  
  if (!movie || !session) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="booking-page">
      <button className="back-button" onClick={goBack}>
        &larr; Back to Movies
      </button>
      
      <header className="booking-header">
        <h1>{movie.title}</h1>
        <p>Session: {session.date} at {session.time}</p>
      </header>
      
      {!showForm ? (
        <>
          <div className="booking-instructions">
            <h3>Select Your Seats</h3>
            <p>Click on available seats to select them for booking.</p>
          </div>
          
          <CinemaHall 
            movieId={parseInt(movieId)}
            sessionId={parseInt(sessionId)}
            onSelectSeats={handleSeatSelection}
          />
          
          {selectedSeats.length > 0 && (
            <div className="booking-actions">
              <button 
                className="proceed-button"
                onClick={handleProceedToBooking}
              >
                Book {selectedSeats.length} Seat(s)
              </button>
            </div>
          )}
        </>
      ) : (
        <BookingForm 
          movieId={parseInt(movieId)}
          sessionId={parseInt(sessionId)}
          selectedSeats={selectedSeats}
          onGoBack={() => setShowForm(false)}
          movieTitle={movie.title}
          sessionTime={`${session.date} at ${session.time}`}
        />
      )}
    </div>
  );
};

export default Booking;