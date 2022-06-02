import React from "react";
import { styled } from "@mui/styles";
import { Box, Dialog, DialogTitle, DialogContent, Button, DialogActions, TextField, Stack } from "@mui/material";
import { WorklogForIssueDto } from "interfaces&Types/issueReturnIfaces/issuesReturnRoot";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

const StyledWorklogModal = styled(Box)({  });

type WorklogContentProps = {
  open: boolean;
  handleClose: () => void;
  worklog: WorklogForIssueDto;
};

const WorklogModalContent: React.FC<WorklogContentProps> = ({ open, handleClose, worklog }) => {
  const [date, setDate] = React.useState<Date | null>(worklog.startedDT);
  const handleDateChange = (newValue: Date | null) => {
    setDate(newValue);
  };
  return (
    <StyledWorklogModal >
      <Dialog open={open} onClose={handleClose} style={{minWidth: '500px'}} fullWidth >
        <DialogTitle>{"Time tracking"}</DialogTitle>
        <DialogContent dividers >
          <Stack spacing={2} >
            <TextField
              style={{ marginBlock: "20px" }}
              id="outlined-basic"
              label="Time spent"
              variant="outlined"
              defaultValue={worklog.timeSpent}
              helperText="Use format 2w 3d 6h 8m"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date started"
                value={date}
                onChange={handleDateChange}
                renderInput={(props) => <TextField {...props} />}
              />
            </LocalizationProvider>
            <TextField
              label="Work description"
              multiline
              rows={4}
              defaultValue={worklog.commentText}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </StyledWorklogModal>
  );
};

export default WorklogModalContent;
