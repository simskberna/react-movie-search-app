import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from 'components/Search';
import Filters from 'components/Filters';
import MovieTable from 'components/MovieTable';
import { Movie } from 'types';
import { Container } from '@mui/material';
import { useMediaQuery } from '@mui/material';

const App: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('');
  const [searchText, setSearchText] = useState('pokemon');
  const [yearFilter, setYearFilter] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  const handleMovieClick = (row: Movie) => {
    navigate(`/movie/${row.imdbID}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };
  useEffect(() => {
  }, [searchText, activeFilter, yearFilter, page, rowsPerPage]);

  return (
    <>
      <Container sx={{
        maxWidth: '100% !important',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: { xs: 2, md: 0 },
        pb: { xs: 2, md: 0 },
        my: { xs: 0, md: 5 },
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        {isMobile && <Search searchText={searchText} setSearchText={setSearchText} />}
        <Filters 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
          yearFilter={yearFilter} 
          setYearFilter={setYearFilter} 
        />
        {!isMobile &&<Search searchText={searchText} setSearchText={setSearchText} />}
        
      </Container>
      <Container sx={{ maxWidth: '100% !important' }}>
        <MovieTable
          searchText={searchText}
          activeFilter={activeFilter}
          yearFilter={yearFilter}
          page={page}
          rowsPerPage={rowsPerPage}
          onRowClick={handleMovieClick}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Container> 
    </>
  );
}

export default App;
