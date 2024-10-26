import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../store/moviesSlice';
import { RootState } from '../store/store';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../store/store';

const MovieDetail: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const dispatch = useDispatch<AppDispatch>();
  
  const currentMovie = useSelector((state: RootState) => state.movies.currentMovie);
  const loading = useSelector((state: RootState) => state.movies.loading);
  const error = useSelector((state: RootState) => state.movies.error);

  useEffect(() => {
    if (imdbID) {
      dispatch(fetchMovieDetails(imdbID));
    }
  }, [imdbID, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!currentMovie) return <p>No movie details found.</p>;

  return (
    <div>
      <h1>{currentMovie.Title}</h1>
      <p>Year: {currentMovie.Year}</p>
      <p>Genre: {currentMovie.Genre}</p>
      <p>Plot: {currentMovie.Plot}</p>
      <img src={currentMovie.Poster} alt={currentMovie.Title} />
    </div>
  );
};

export default MovieDetail;
