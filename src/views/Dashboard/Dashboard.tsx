import * as React from 'react';
import { Box, Toolbar, Container, Paper, Grid } from '@mui/material';
import AppBar from 'components/organisms/AppBar';
import Drawer from 'components/organisms/Drawer';
import { Outlet } from 'react-router-dom';

const DashboardContent: React.FC<any> = (props) => {
  const [open, setOpen] = React.useState<boolean>(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar open={open} toggleDrawer={toggleDrawer} />
      <Drawer open={open} toggleDrawer={toggleDrawer} />
      <Box
        component='main'
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}>
        <Toolbar />
        <Container maxWidth='xl' sx={{ marginTop: 1} }>
          <Grid item>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
              }}>
              <Outlet />
            </Paper>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardContent;
