import React, { useState, useEffect } from 'react';
import styles from './Input.module.scss';
import SearchIcon from '@mui/icons-material/Search';

interface InputProps {
  placeholder: string;
  onChange?: (value: string) => void;
  isSearchInput?: boolean;
  debounceDelay?: number;
  value?: string;
}

const Input: React.FC<InputProps> = ({ 
  placeholder, 
  onChange, 
  isSearchInput = false, 
  debounceDelay = 300,
  value = '' 
}) => {
  const [inputValue, setInputValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (onChange) {
        onChange(inputValue);
      }
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, onChange, debounceDelay]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      {isSearchInput && <SearchIcon sx={{ color: 'gray' }} className={styles.icon} />}
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Input;
