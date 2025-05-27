import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async (e) => {
    console.log("process.env.REACT_APP_OMDB_API_KEY", process.env.REACT_APP_OMDB_API_KEY, searchTerm);
    e.preventDefault();
    const response = await axios.get(`https://www.omdbapi.com/?apikey=42909feb&s=${searchTerm}`);
    setMovies(response.data.Search || []);
  };

  return (
    <div className="App">
      <h1>🎬 Movie Search App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {selectedMovie ? (
        <MovieDetail imdbID={selectedMovie} onBack={() => setSelectedMovie(null)} />
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} onClick={() => setSelectedMovie(movie.imdbID)} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

