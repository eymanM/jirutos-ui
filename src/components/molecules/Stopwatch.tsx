import { Watch } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { APP_NAME } from 'state/constans/constans';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useActions } from 'hooks/useActions';
// type StopwatchProps = {
//   taskID: string;
//   setStopwatchEnabled: React.Dispatch<React.SetStateAction<boolean>>;
//   start: boolean;
//   setStart: React.Dispatch<React.SetStateAction<boolean>>;
// };

const Stopwatch: React.FC<any> = () => {
  const [time, setTime] = React.useState(0);
  const [formattedTimeValue, setFormattedTimeValue] = React.useState('0:00:00');
  const [start, setStart] = React.useState(false);
  const { updateStopwatch } = useActions();
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (start) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1000);
      }, 1000);
      setFormattedTimeValue(moment(time).add(-1, 'hour').format('H:mm:ss'));
      document.title = formattedTimeValue;
      updateStopwatch(time);
    } else {
      clearInterval(interval!);
      document.title = APP_NAME;
    }

    return () => {
      document.title = APP_NAME;
      clearInterval(interval);
    };
  });

  return (
    <Box sx={{ flexDirection: 'row', display: 'flex' }}>
      <TextField value={formattedTimeValue} sx={{ maxWidth: 120, backgroundColor: '#1e88e5' }} />
      <Button
        variant="contained"
        color="secondary"
        endIcon={<Watch />}
        onClick={() => setStart((prev) => !prev)}
        sx={{ ml: 2, maxWidth: 90, marginRight: 2 }}>
        {start ? 'STOP' : 'START'}
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setFormattedTimeValue('0:00:00');
          setTime(0);
        }}>
        Reset
      </Button>
    </Box>
  );
};
export default Stopwatch;
