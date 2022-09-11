import React from 'react';
import DrawerStyled from 'components/molecules/Drawer.styled';
import { Toolbar, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { FilterAlt, Assessment } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';

const Drawer: React.FC<any> = ({ open, toggleDrawer }) => {
  return (
    <DrawerStyled variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <>
        <Link to="/Calendar" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
        </Link>
        <Link to="/Filter" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem button>
            <ListItemIcon>
              <FilterAlt />
            </ListItemIcon>
            <ListItemText primary="Filters" />
          </ListItem>
        </Link>
        <Link to="/Report" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem button>
            <ListItemIcon>
              <Assessment />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
        </Link>
      </>
    </DrawerStyled>
  );
};

export default Drawer;
