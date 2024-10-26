import axios, { AxiosInstance } from 'axios';
import { Movie } from '../types';

const API_KEY = process.env.REACT_APP_API_KEY;

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMoviesBySearch = async (
  search: string, 
  type?: string, 
  year?: string, 
  page: number = 1,
  rowsPerPage: number = 10
) => {
  const response = await api.get(`?s=${search}&y=${year}&type=${type}&page=${page}&r=json&apikey=${API_KEY}`);
  
  const totalResults = response.data.totalResults ? parseInt(response.data.totalResults, 10) : 0;

  return {
    movies: response.data.Search || [],
    totalResults: totalResults,
  };
};

export const getMovieDetails = async (imdbID: string): Promise<Movie> => {
  try {
    const response = await api.get(`?i=${imdbID}&apikey=${API_KEY}&plot=full`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
