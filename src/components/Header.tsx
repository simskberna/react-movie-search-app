import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'; 
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{background:'#000',maxWidth:'100% !important'}}>
      <Toolbar>
        <Typography variant="h6" sx={{color:'white', flexGrow: 1 }}>
          <Link style={{textDecoration:'none',color:'white'}} to='/'>Movies App</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;