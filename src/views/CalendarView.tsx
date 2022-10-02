import React from 'react';
import moment from 'moment';
import { WorklogForIssueDto } from 'interfaces&Types/issueReturnIfaces/IsuesReturnRoot';
import WeekCalendar from 'components/organisms/WeekCalendar';
import { WorklogDateRange } from 'endpoint/endpointWorklogExecuter';
import { v4 as uuidv4 } from 'uuid';
import { useTypedSelector } from 'hooks/useTypedSelector';
import CustomDayCalendar from 'components/molecules/CustomDayCalendar.styled';
import { Box } from '@mui/material';
import { flexbox, height } from '@mui/system';

const CalendarView: React.FC<any> = (props) => {
  const [worklogs, setWorklogs] = React.useState<WorklogForIssueDto[]>([]);
  const [startDate, setStartDate] = React.useState<moment.Moment>(moment().startOf('isoWeek'));
  const endDate = moment(startDate.toDate()).endOf('isoWeek');
  const { rerenderCalendar } = useTypedSelector((state) => state.tasks); //state for rerender calendar

  React.useEffect(() => {
    WorklogDateRange(startDate, endDate).then((data) => setWorklogs(data));
  }, [startDate]);

  return (
    <>
      <Box sx={{ display: 'flex', aligItems: 'left', marginBottom: 1 }}>
        <CustomDayCalendar setStartDate={setStartDate} />
      </Box>
      <WeekCalendar key={uuidv4()} worklogs={worklogs} startDate={startDate} setStartDate={setStartDate} />
    </>
  );
};

export default CalendarView;
