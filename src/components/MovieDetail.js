import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieDetail = ({ imdbID, onBack }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${imdbID}&plot=full`);
      setDetails(res.data);
    };
    fetchDetails();
  }, [imdbID]);

  if (!details) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      <button onClick={onBack}>← Back</button>
      <h2>{details.Title} ({details.Year})</h2>
      <img src={details.Poster} alt={details.Title} />
      <p><strong>Actors:</strong> {details.Actors}</p>
      <p><strong>Plot:</strong> {details.Plot}</p>
      <p><strong>Genre:</strong> {details.Genre}</p>
      <p><strong>IMDB Rating:</strong> {details.imdbRating}</p>
    </div>
  );
};

export default MovieDetail;
