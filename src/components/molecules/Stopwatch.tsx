import { Watch } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { APP_NAME } from 'state/constans/constans';

type StopwatchProps = {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  startState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

const Stopwatch: React.FC<StopwatchProps> = ({ time, setTime, startState }) => {
  const [formattedTimeValue, setFormattedTimeValue] = React.useState('0:00:00');
  const [start, setStart] = startState;

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (start) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1000);
      }, 1000);
      setFormattedTimeValue(moment(time).add(-1, 'hour').format('H:mm:ss'));
      document.title = formattedTimeValue;
    } else {
      //clearInterval(interval!);
      document.title = APP_NAME;
    }

    return () => {
      document.title = APP_NAME;
      clearInterval(interval);
    };
  });

  React.useEffect(() => {
    if (!time) return;
    setFormattedTimeValue(moment(time).add(-1, 'hour').format('H:mm:ss'));
  }, []);

  return (
    <Box sx={{ flexDirection: 'row', display: 'flex' }}>
      <TextField value={formattedTimeValue} sx={{ maxWidth: 120 }} />
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
