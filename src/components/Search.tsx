import React from 'react';
import Input from './Input/Input';

interface SearchProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchText, setSearchText }) => (
  <Input
    placeholder="Search..."
    isSearchInput={true}
    onChange={setSearchText}
    value={searchText}
  />
);

export default Search;
