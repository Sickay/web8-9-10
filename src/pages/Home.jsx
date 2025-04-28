// src/pages/Home.jsx
import { movies } from '../data/movies';
import MovieList from '../components/MovieList';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <header className="header">
        <h1>Cinema Booking App</h1>
        <p>Browse movies and book your tickets</p>
      </header>
      
      <main>
        <MovieList movies={movies} />
      </main>
    </div>
  );
};

export default Home;