import React from "react";
import AppBarStyled from "components/molecules/AppBar.styled";
import MenuIcon from "@mui/icons-material/Menu";
import ButtonIcon from "components/atoms/ButtonIcon";
import { Toolbar, Typography } from "@mui/material";
import { APP_NAME } from "state/constans/constans";

const AppBar: React.FC<any> = ({ open, toggleDrawer }) => {
  return (
    <AppBarStyled position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        <ButtonIcon open={open} onClick={toggleDrawer}>
          <MenuIcon />
        </ButtonIcon>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          {APP_NAME}
        </Typography>
      </Toolbar>
    </AppBarStyled>
  );
};

export default AppBar;
