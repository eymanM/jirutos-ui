import React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { styled } from '@mui/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AddWorklog, IsIssueExist } from 'endpoint/endpointWorklogExecuter';
import { StopwatchItemProps } from 'interfaces&Types/StopwatchItemProps';
import { SpanStrFromMs } from 'endpoint/endpointUtlisExecuter';

const StyledAddWorklogModal = styled(Box)({});

type AddWorklogModalProps = {
  open: boolean;
  handleClose: () => void;
  issueId: string;
  customField?: string;
  typeName: string;
  stopwatchItems?: StopwatchItemProps[];
  setStopwatchItems?: React.Dispatch<React.SetStateAction<StopwatchItemProps[]>>;
};

const AddWorklogModalStyled: React.FC<AddWorklogModalProps> = ({
  open,
  handleClose,
  issueId,
  customField,
  typeName,
  stopwatchItems,
  setStopwatchItems,
}) => {
  const [dateStarted, setDateStarted] = React.useState(new Date());
  const [timeSpent, setTimeSpent] = React.useState('1m');
  const [displayAlert, setDisplayAlert] = React.useState({ show: false, message: '' });

  React.useEffect(() => {
    const timeSpendSec = stopwatchItems?.filter((x) => x.taskId === issueId)[0]?.timeSpend;
    async function setTimeStr() {
      const res = await SpanStrFromMs(timeSpendSec!);
      setTimeSpent(res);
    }

    timeSpendSec && setTimeStr();
  }, [issueId]);

  const handleSave = async () => {
    const isIssueExist = await IsIssueExist(typeName, issueId);

    if (!isIssueExist.exist) {
      setDisplayAlert({ show: true, message: 'No such issue - ' + issueId });
      handleClose();
      return;
    }
    await AddWorklog(typeName, {
      id: issueId,
      timeSpend: timeSpent.toString(),
      startedUnix: dateStarted.getTime(),
      customField: customField,
    });
    if (setStopwatchItems)
      setStopwatchItems((prev) => {
        const filteredItems = prev.filter((x) => x.taskId !== issueId);
        return filteredItems;
      });
    handleClose();
  };

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
      {displayAlert.show && (
        <Alert
          variant="filled"
          sx={{ position: 'fixed', bottom: '2%', right: '2%' }}
          onClose={() => setDisplayAlert({ show: false, message: '' })}
          severity="warning">
          {displayAlert.message}
        </Alert>
      )}
    </StyledAddWorklogModal>
  );
};

export default AddWorklogModalStyled;
