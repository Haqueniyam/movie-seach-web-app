import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On app load, check if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("sessionToken");
    console.log("useEffect token", token);
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handler to call after successful login (from Login component)
  const handleLoginSuccess = () => {
    console.log("handleLoginSuccess");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionToken"); // clear token
    setIsLoggedIn(false); // update state to logged out
    setSearchTerm(""); // optional: reset search term
    setMovies([]); // optional: clear movie results
    setSelectedMovie(null); // optional: reset selected movie
  };

  const handleSearch = async (e) => {
    console.log(
      "process.env.REACT_APP_OMDB_API_KEY",
      process.env.REACT_APP_OMDB_API_KEY,
      searchTerm
    );
    e.preventDefault();
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=42909feb&s=${searchTerm}`
    );
    setMovies(response.data.Search || []);
  };

const params = new URLSearchParams(window.location.search);
const token = params.get('token');
console.log("token12", token);
// if (token) {
//   localStorage.setItem('sessionToken', token);
//   // Update UI accordingly
// }


  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
       
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
            <MovieDetail
              imdbID={selectedMovie}
              onBack={() => setSelectedMovie(null)}
            />
          ) : (
            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie.imdbID)}
                />
              ))}
            </div>
          )}

             <button
            onClick={handleLogout}
            style={{
              float: "right",
              margin: "10px 20px",
              padding: "8px 16px",
              backgroundColor: "#d9534f",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default App;
