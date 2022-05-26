import React from "react";
import { styled } from "@mui/styles";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from "@mui/material";

const StyledWorklogModal = styled(Box)({ });

type WorklogContentProps = {
  open: boolean;
  handleClose: () => void;
};

const WorklogModalContent: React.FC<WorklogContentProps> = ({
  open,
  handleClose,
}) => {
  return (
    <StyledWorklogModal>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Time tracking"}</DialogTitle>
        <DialogContent>
          <DialogContentText >
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </StyledWorklogModal>
  );
};

export default WorklogModalContent;
