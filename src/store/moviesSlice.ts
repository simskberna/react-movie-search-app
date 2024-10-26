import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMoviesBySearch, getMovieDetails } from '../services/api';
import { Movie } from '../types';

interface MoviesState {
  data: Movie[];
  loading: boolean;
  error: string | null;
  currentMovie: Movie | null;
}

const initialState: MoviesState = {
  data: [],
  loading: false,
  error: null,
  currentMovie: null,
};

export const fetchMovies = createAsyncThunk<Movie[], { searchText: string; activeFilter: string; yearFilter: string }>(
  'movies/fetchMovies',
  async ({ searchText, activeFilter, yearFilter }) => {
    const moviesData = await getMoviesBySearch(searchText, activeFilter, yearFilter);
    return moviesData;
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
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
