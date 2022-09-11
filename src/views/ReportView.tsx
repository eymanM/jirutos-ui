import React from 'react';
import moment from 'moment';
import { Box, Button } from '@mui/material';
import { GetIssuesBasicReport, GetProjectsBasicReport } from 'endpoint/endpointReportExecuter';

const ReportView: React.FC<any> = (props) => {
  const [startDate, setStartDate] = React.useState<moment.Moment>(moment().startOf('isoWeek'));
  React.useEffect(() => {}, []);

  return (
    <>
      <Button style={{ marginInline: 50 }} onClick={() => GetProjectsBasicReport()} variant="outlined">
        Get projects report
      </Button>

      <Button style={{ marginInline: 50 }} onClick={() => GetIssuesBasicReport()} variant="outlined">
        Get issues report
      </Button>
    </>
  );
};

export default ReportView;
