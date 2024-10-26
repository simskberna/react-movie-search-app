import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../../store/moviesSlice';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { CircularProgress, Typography, Paper, Grid, Chip } from '@mui/material';
import './MovieDetail.scss';

const MovieDetail: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const currentMovie = useSelector((state: RootState) => state.movies.currentMovie);
  const loading = useSelector((state: RootState) => state.movies.loading);
  const error = useSelector((state: RootState) => state.movies.error);

  useEffect(() => {
    if (imdbID && !currentMovie) {
      dispatch(fetchMovieDetails(imdbID));
    }
  }, [imdbID, dispatch, currentMovie]);

  if (loading) return <CircularProgress className="spinner" />;
  if (error) return <p>Error: {error}</p>;

  if (!currentMovie) return <p>No movie details found.</p>;

  return (
    <Paper elevation={3} className="movie-detail">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <img src={currentMovie.Poster} alt={currentMovie.Title} className="movie-poster" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" className="movie-title">{currentMovie.Title}</Typography>
          <Typography variant="subtitle1"><strong>Year:</strong> {currentMovie.Year}</Typography>
          <Typography variant="subtitle1"><strong>Genre:</strong> <Chip label={currentMovie.Genre} /></Typography>
          <Typography variant="subtitle1"><strong>Director:</strong> {currentMovie.Director}</Typography>
          <Typography variant="subtitle1"><strong>Runtime:</strong> {currentMovie.Runtime}</Typography>
          <Typography variant="subtitle1"><strong>IMDb Rating:</strong> {currentMovie.imdbRating}</Typography>
          <Typography variant="subtitle1"><strong>Cast:</strong> {currentMovie.Actors}</Typography>
          <Typography variant="body1" className="movie-plot"><strong>Plot:</strong> {currentMovie.Plot}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MovieDetail;