import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../../store/moviesSlice';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Paper,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
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
  if (error) return <Typography color="error">Error: {error}</Typography>;

  if (!currentMovie) return <Typography>No movie details found.</Typography>;

  return (
    <Box className="movie-detail-container" display="flex" flexDirection={{ xs: 'column', md: 'row' }} p={2} bgcolor="#d1d1d11a;">
      <Box flex={{ xs: 'none', md: '1' }} mb={{ xs: 2, md: 0 }} mr={{ md: 2 }}>
        <Paper elevation={3} className="movie-poster-container" sx={{height:{xs:400,md:'auto'},width:{xs:'100%',md:500}}}>
          <img src={currentMovie.Poster} alt={currentMovie.Title} className="movie-poster" />
        </Paper>
      </Box>
      <Box flex={{ xs: 'none', md: '2' }}>
        <Card elevation={4} className="movie-details-card" sx={{minHeight:{md:'74vh'},bgcolor:'#d1d1d11a'}}>
          <CardContent>
            <Typography variant="h3" gutterBottom>{currentMovie.Title}</Typography>
            <Typography variant="h6">{currentMovie.Year}</Typography>
            <Box display="flex" alignItems="center">
              <StarIcon color="primary" />
              <Typography variant="h6" className="rating">{currentMovie.imdbRating}</Typography>
            </Box>
            <Typography variant="subtitle1"><strong>Genre:</strong> {currentMovie.Genre}</Typography>
            <Typography variant="subtitle1"><strong>Director:</strong> {currentMovie.Director}</Typography>
            <Typography variant="subtitle1"><strong>Runtime:</strong> {currentMovie.Runtime}</Typography>
            <Typography variant="subtitle1"><strong>Cast:</strong> {currentMovie.Actors}</Typography>
            <Typography variant="body1" paragraph><strong>Plot:</strong> {currentMovie.Plot}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default MovieDetail;
