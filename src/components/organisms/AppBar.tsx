import React from 'react';
import AppBarStyled from 'components/molecules/AppBar.styled';
import MenuIcon from '@mui/icons-material/Menu';
import ButtonIcon from 'components/atoms/ButtonIcon';
import { Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { APP_NAME } from 'state/constans/constans';
import Stopwatch from 'components/molecules/Stopwatch';
import { AssignmentInd } from '@mui/icons-material';

const AppBar: React.FC<any> = ({ open, toggleDrawer }) => {
  return (
    <AppBarStyled position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: '24px',
        }}>
        <ButtonIcon open={open} onClick={toggleDrawer}>
          <MenuIcon />
        </ButtonIcon>
        <Typography component="h1" variant="h5" color="inherit" noWrap sx={{ flexGrow: 1, marginLeft: '5%' }}>
          {APP_NAME}
          <Link
            style={{ color: 'white', position: 'fixed', right: 30, fontSize: 18, justifyItems: 'center', alignItems: 'center' }}
            onClick={() => localStorage.removeItem('tokens')}
            to="/Sign/in">
            <AssignmentInd />
            Log out
          </Link>
        </Typography>
      </Toolbar>
    </AppBarStyled>
  );
};

export default AppBar;
