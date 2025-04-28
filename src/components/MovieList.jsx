// src/components/MovieList.jsx
import { useState } from 'react';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';
import '../styles/MovieList.css';

const MovieList = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  return (
    <div className="movie-list-container">
      <SearchBar onSearch={handleSearch} />
      
      {filteredMovies.length === 0 ? (
        <p className="no-results">No movies found matching "{searchTerm}"</p>
      ) : (
        <div className="movie-list">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;