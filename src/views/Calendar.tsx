import React from "react";
import moment from "moment";
import { WorklogForIssueDto } from "interfaces&Types/issueReturnIfaces/issuesReturnRoot";
import WeekCalendar from "components/organisms/WeekCalendar";
import { WorklogDateRange } from "endpoint/endpointExecuter";
import { v4 as uuidv4 } from 'uuid';

const Calendar: React.FC<any> = (props) => {
  const [worklogs, setWorklogs] = React.useState<WorklogForIssueDto[]>([]);
  const startDate = moment().startOf("isoWeek");
  const endDate = moment().endOf("isoWeek");

  React.useEffect(() => {
    WorklogDateRange(startDate, endDate).then(data => setWorklogs(data))
  }, []);

  return <WeekCalendar key={uuidv4()} worklogs={worklogs} startDate={startDate} />;
};

export default Calendar;
