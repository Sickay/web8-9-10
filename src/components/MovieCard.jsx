// src/components/MovieCard.jsx
import { useNavigate } from 'react-router-dom';
import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  
  const handleBooking = (sessionId) => {
    navigate(`/booking/${movie.id}/${sessionId}`);
  };

  return (
    <div className="movie-card">
      <img 
        src={movie.posterUrl} 
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-genre">{movie.genre}</p>
        <p className="movie-description">{movie.description}</p>
        
        <div className="movie-sessions">
          <h4>Sessions:</h4>
          <div className="session-buttons">
            {movie.sessions.map(session => (
              <button 
                key={session.id} 
                className="session-button"
                onClick={() => handleBooking(session.id)}
              >
                {session.date} at {session.time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;