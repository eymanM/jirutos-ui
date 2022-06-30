import React from "react";
import { IconButton } from "@mui/material";

const ButtonIcon: React.FC<any> = (props) => {
  return (
    <IconButton
      edge="start"
      color="inherit"
      onClick={props.onClick}
      sx={{
        marginRight: "36px",
        ...(props.open && { display: "none" }),
      }}
    >
      {props.children}
    </IconButton>
  );
};

export default ButtonIcon;
