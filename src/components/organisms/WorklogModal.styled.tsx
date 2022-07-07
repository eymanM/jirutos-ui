import React from "react";
import { styled } from "@mui/styles";
import { Box, Dialog, DialogTitle, DialogContent, Button, DialogActions, TextField, Stack } from "@mui/material";
import { WorklogForIssueDto } from "interfaces&Types/issueReturnIfaces/IssuesReturnRoot";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { UpdateWorklogModel } from "interfaces&Types/UpdateWorklogModel";
import { UpdateWorklog } from "endpoint/endpointWorklogExecuter";
import moment from "moment";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";

const StyledWorklogModal = styled(Box)({});

type WorklogContentProps = {
  open: boolean;
  handleClose: () => void;
  worklog: WorklogForIssueDto;
};

let dateStartedModified = false;

const WorklogModalContent: React.FC<WorklogContentProps> = ({ open, handleClose, worklog }) => {
  const [dateStarted, setDateStarted] = React.useState<Date | null>(worklog.startedDT);
  const { setCalendarRerender } = useActions();

  const buildUpdateModel = (): UpdateWorklogModel => {
    return {
      id: worklog.id,
      issueId: worklog.issueId,
      timeSpent: worklog.timeSpent,
      started: worklog.startedDT,
      customField1: worklog.customField1,
    };
  };

  const handleSave = (model: UpdateWorklogModel) => {
    UpdateWorklog(`${worklog.type}/${worklog.integrationName}`, model);
    handleClose();
    if (dateStartedModified) {
      setCalendarRerender(true);
    }
  };

  return (
    <StyledWorklogModal>
      <Dialog open={open} onClose={handleClose} style={{ minWidth: "500px" }} fullWidth>
        <DialogTitle>{"Time tracking"}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              style={{ marginBlock: "20px" }}
              id="outlined-basic"
              label="Time spent"
              variant="outlined"
              defaultValue={worklog.timeSpent}
              onChange={(e) => {
                worklog.timeSpent = e.target.value;
              }}
              helperText="Use format 2w 3d 6h 8m"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date started"
                value={dateStarted}
                onChange={(newValue) => {
                  if (!newValue) return;
                  worklog.startedDT = newValue;
                  setDateStarted(newValue);
                  dateStartedModified = true;
                }}
                renderInput={(props) => <TextField {...props} />}
              />
            </LocalizationProvider>
            <TextField label="Work description" multiline rows={3} defaultValue={worklog.commentText} disabled />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSave(buildUpdateModel())}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </StyledWorklogModal>
  );
};

export default WorklogModalContent;
