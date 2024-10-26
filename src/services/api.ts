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

export const getMoviesBySearch = async (search: string, type?: string,year?: string ): Promise<Movie[]> => {
    try {
      const filterType = type ? `&type=${type}` : '';
      const yearFilter = year ? `&y=${year}` : '';
      const response = await api.get(`?s=${search}${yearFilter}${filterType}&apikey=${API_KEY}`);
      return response.data.Search || [];
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
};
export const getMovieDetails = async (imdbID: string): Promise<Movie> => {
  try {
    const response = await api.get(`?i=${imdbID}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
  