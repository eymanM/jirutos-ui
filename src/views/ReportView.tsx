import React from 'react';
import { Info } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { GetIssuesBasicReport, GetProjectsBasicReport } from 'endpoint/endpointReportExecuter';

const ReportView: React.FC<any> = (props) => {
  const tooltipText = `All presented in reports time is a work time (1d = 8h)`;

  return (
    <Box>
      <Button style={{ marginInline: 50 }} onClick={() => GetProjectsBasicReport()} variant="outlined">
        Get projects report
      </Button>

      <Button style={{ marginInline: 50 }} onClick={() => GetIssuesBasicReport()} variant="outlined">
        Get issues report
      </Button>
      <Tooltip title={tooltipText}>
        <IconButton size="small" style={{ alignSelf: 'start', alignItems: 'self-start' }}>
          <Info fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ReportView;
