import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMoviesBySearch, getMovieDetails } from '../services/api';
import { Movie } from '../types';

interface MoviesState {
  data: Movie[];
  currentMovie: Movie | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: MoviesState = {
  data: [],
  currentMovie: null,
  loading: false,
  error: null,
  totalCount: 0,
};

export const fetchMovies = createAsyncThunk< 
  { movies: Movie[]; totalCount: number }, 
  { searchText: string; activeFilter: string; yearFilter: string; page: number; rowsPerPage: number }
>(
  'movies/fetchMovies',
  async ({ searchText, activeFilter, yearFilter, page, rowsPerPage }) => {
    const { movies, totalResults } = await getMoviesBySearch(searchText, activeFilter, yearFilter, page, rowsPerPage);
    return { movies, totalCount: totalResults };
  }
);

export const fetchMovieDetails = createAsyncThunk<Movie, string>(
  'movies/fetchMovieDetails',
  async (imdbID) => {
    const movieData = await getMovieDetails(imdbID);
    return movieData;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.data = [];
      state.currentMovie = null;
      state.totalCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.movies;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching movies';
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching movie details';
      });
  },
});

export const { clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
