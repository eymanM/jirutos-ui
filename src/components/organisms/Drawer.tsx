import { AccessTime, Assessment, FilterAlt, Settings } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Divider, IconButton, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import DrawerStyled from 'components/molecules/Drawer.styled';
import React from 'react';
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
        <Link to="/Stopwatch" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem button>
            <ListItemIcon>
              <AccessTime />
            </ListItemIcon>
            <ListItemText primary="Stopwatch" />
          </ListItem>
        </Link>
        <Link to="/Settings" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </Link>
      </>
    </DrawerStyled>
  );
};

export default Drawer;
