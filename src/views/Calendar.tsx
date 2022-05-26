import React from 'react';
import { URL } from 'state/constans/constans';
import axios from 'axios'
import moment from 'moment';
import { WorklogForIssueDto } from 'interfaces&Types/issueReturnIfaces/issuesReturnRoot';
import WeekCalendar from 'components/organisms/WeekCalendar'
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';


const Calendar: React.FC<any> = (props) => {

  const [worklogs, setWorklogs] = React.useState<WorklogForIssueDto[]>([]);
  const startDate = moment().startOf('isoWeek')
  const endDate = moment().endOf('isoWeek')
 
  React.useEffect(() => {
    axios
      .post<moment.Moment, { data: WorklogForIssueDto[]}>(
        `${URL}/Issues/DateRangeWorklogs`, {
          dateFrom: startDate,
          dateTo: endDate,
        }, { 
          withCredentials: true,
        }
      )
      .then((data) => {
        setWorklogs(data.data as WorklogForIssueDto[]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <WeekCalendar worklogs={worklogs} startDate={startDate} />
  );
};

export default Calendar;