import React, { useEffect, useMemo } from 'react';
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
  const totalCount = useSelector((state: RootState) => state.movies.totalCount) ?? 0;

  useEffect(() => {
    dispatch(fetchMovies({ searchText, activeFilter, yearFilter, page, rowsPerPage }));
  }, [searchText, activeFilter, yearFilter, page, rowsPerPage, dispatch]);
  

  const mappedMovies = moviesData.map(movie => ({
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Type: movie.Type,
      Poster: movie.Poster || '',
  }));
  


  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {mappedMovies.length === 0 ? (
            <Box sx={{ textAlign: 'center', color: 'white', marginTop: 2 }}>
              <p>No data found.</p>
            </Box>
          ) : (
            <TableComponent
              rows={mappedMovies}
              onRowClick={onRowClick}
              page={page}
              rowsPerPage={rowsPerPage}
              totalCount={totalCount}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
              headCells={[
                { id: 'Title', numeric: false, label: 'Title' },
                { id: 'Year', numeric: true, label: 'Year' },
                { id: 'imdbID', numeric: true, label: 'IMDB ID' },
                { id: 'Type', numeric: true, label: 'Type' },
              ]}
            />
          )}
        </>
      )}
    </>
  );
};



export default MovieTable;
