import React from 'react';
import styles from '../Button/Button.module.scss'

interface ButtonProps {
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    inactive?: boolean;
}

const Button: React.FC<ButtonProps> = ({text,onClick,disabled,inactive  }) => {
  return (
    <button 
          className={`${styles.customButton} ${disabled ? styles.disabled : ''} ${inactive ? styles.inactive : ''}`}
          onClick={disabled ? undefined : onClick}
          disabled={disabled}>

          {text}
    </button>
  );
};

export default Button;