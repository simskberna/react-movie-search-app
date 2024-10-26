import React from 'react';
import Button from './Button/Button';
import Input from './Input/Input';
import { Container,Stack } from '@mui/material';

interface FiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  yearFilter: string;
  setYearFilter: (year: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ activeFilter, setActiveFilter, yearFilter, setYearFilter }) => {
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <Container sx={{maxWidth:'100% !important',display:'flex',gap:2,flexDirection:{xs:'column',md:'row',justifyContent:'flex-start'}}} style={{padding:0}}>
      <Stack sx={{display:'flex',gap:2,flexDirection:'row',justifyContent:{xs:'space-between'}}}>
        <Button text='Movies' inactive={activeFilter !== 'movie'} onClick={() => handleFilterClick('movie')} />
        <Button text='Tv Shows' inactive={activeFilter !== 'series'} onClick={() => handleFilterClick('series')} />
        <Button text='Episodes' inactive={activeFilter !== 'episode'} onClick={() => handleFilterClick('episode')} />
      </Stack>
      <Input
        placeholder='Enter Year...'
        value={yearFilter}
        onChange={(e) => setYearFilter(e)}
      />
    </Container>
  );
};

export default Filters;
