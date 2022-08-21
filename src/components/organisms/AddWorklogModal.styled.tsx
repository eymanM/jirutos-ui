import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { styled } from '@mui/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AddWorklog } from 'endpoint/endpointWorklogExecuter';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { IssueForFilterModel } from 'interfaces&Types/IssueForFilterModel';
import { SpanStrFromMs } from 'endpoint/endpointUtlisExecuter';

const StyledAddWorklogModal = styled(Box)({});

type AddWorklogModalProps = {
  open: boolean;
  handleClose: () => void;
  issue: IssueForFilterModel;
  typeName: string;
};

const AddWorklogModalStyled: React.FC<AddWorklogModalProps> = ({ open, handleClose, issue, typeName }) => {
  const [dateStarted, setDateStarted] = React.useState(new Date());
  const { stopwatchSeconds } = useTypedSelector((state) => state.tasks);
  const [timeSpent, setTimeSpent] = React.useState(`1m`);

  const handleSave = () => {
    AddWorklog(typeName, {
      id: issue.issueId,
      timeSpend: timeSpent,
      startedUnix: dateStarted.getTime(),
      customField: issue.customField,
    });
    handleClose();
  };

  React.useEffect(() => {
    if (stopwatchSeconds % 60000 !== 0) return;
    async function fetchData() {
      setTimeSpent(await SpanStrFromMs(stopwatchSeconds));
    }
    fetchData();
  }, [stopwatchSeconds]);

  return (
    <StyledAddWorklogModal>
      <Dialog open={open} onClose={handleClose} style={{ minWidth: '500px' }} fullWidth>
        <DialogTitle>{'Time tracking'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              style={{ marginBlock: '20px' }}
              id="outlined-basic"
              label="Time spent"
              variant="outlined"
              value={timeSpent}
              onChange={(e) => {
                setTimeSpent(e.target.value);
              }}
              helperText="Use format 2w 3d 6h 8m"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date started"
                value={dateStarted}
                onChange={(newValue) => {
                  if (!newValue) return;
                  setDateStarted(newValue);
                }}
                renderInput={(props) => <TextField {...props} />}
              />
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSave()}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </StyledAddWorklogModal>
  );
};

export default AddWorklogModalStyled;
