import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../../store/moviesSlice';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { CircularProgress } from '@mui/material';
import './MovieDetail.scss';

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

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;

  if (!currentMovie) return <p>No movie details found.</p>;

  return (
    <div className="movie-detail">
      <img src={currentMovie.Poster} alt={currentMovie.Title} className="movie-poster" />
      <h1 className="movie-title">{currentMovie.Title}</h1>
      <p><strong>Year:</strong> {currentMovie.Year}</p>
      <p><strong>Genre:</strong> {currentMovie.Genre}</p>
      <p><strong>Director:</strong> {currentMovie.Director}</p>
      <p><strong>Runtime:</strong> {currentMovie.Runtime}</p>
      <p><strong>IMDb Rating:</strong> {currentMovie.imdbRating}</p>
      <p><strong>Cast:</strong> {currentMovie.Actors}</p>
      <p><strong>Plot:</strong> {currentMovie.Plot}</p>
    </div>
  );
};

export default MovieDetail;
