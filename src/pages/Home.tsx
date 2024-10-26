import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from 'components/Search';
import Filters from 'components/Filters';
import MovieTable from 'components/MovieTable';
import { Movie } from 'types';
import { Container } from '@mui/material';

const App: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('movie');
  const [searchText, setSearchText] = useState('pokemon');
  const [yearFilter, setYearFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  const handleMovieClick = (row: Movie) => {
    navigate(`/movie/${row.imdbID}`); 
  };

  return ( 
      <>
      <Container sx={{maxWidth:'100% !important',display:'flex',justifyContent:'space-between',alignItems:{xs:'flex-start',md:'center'},
      gap:{xs:2,md:0},pb:{xs:2,md:0},my:{xs:0,md:5},flexDirection:{xs:'column',md:'row'}}}>
        <Filters 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
          yearFilter={yearFilter} 
          setYearFilter={setYearFilter} 
        />
         <Search searchText={searchText} setSearchText={setSearchText} />
      </Container>
      <Container sx={{maxWidth:'100% !important',}}>
        <MovieTable 
            searchText={searchText}
            activeFilter={activeFilter}
            yearFilter={yearFilter}
            page={page}
            rowsPerPage={rowsPerPage}
            onRowClick={handleMovieClick}
            onChangePage={(event: unknown, newPage: number) => setPage(newPage)}
            onChangeRowsPerPage={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
      </Container> 
      </>
  );
}

export default App;
