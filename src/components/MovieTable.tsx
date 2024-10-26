import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/moviesSlice';
import TableComponent from './TableComponent';
import { Movie, Data } from '../types';
import { AppDispatch, RootState } from '../store/store';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface MovieTableProps {
  searchText: string;
  activeFilter: string;
  yearFilter: string;
  page: number;
  rowsPerPage: number;
  onRowClick: (row: Movie) => void;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MovieTable: React.FC<MovieTableProps> = ({
  searchText,
  activeFilter,
  yearFilter,
  page,
  rowsPerPage,
  onRowClick,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const moviesData = useSelector((state: RootState) => state.movies.data);
  const loading = useSelector((state: RootState) => state.movies.loading);

  useEffect(() => {
    dispatch(fetchMovies({ searchText, activeFilter, yearFilter }));
  }, [searchText, activeFilter, yearFilter, dispatch]);

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {moviesData.length === 0 ? (
            <Box sx={{ textAlign: 'center', color: 'white', marginTop: 2 }}>
              <p>No data found.</p>
            </Box>
          ) : (
            <TableComponent
              headCells={[
                { id: 'Title', numeric: false, label: 'Name' },
                { id: 'Year', numeric: true, label: 'Release Year' },
                { id: 'imdbID', numeric: false, label: 'IMDb ID' },
              ]}
              rows={moviesData.map(movie => ({
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Poster: movie.Poster || '',
              }) as Data)}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
              onRowClick={onRowClick}
            />
          )}
        </>
      )}
    </>
  );
};

export default MovieTable;
