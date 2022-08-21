import React from 'react';
import { Box, Button, Card, CardContent, Grid, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

const ReportView: React.FC<any> = (props) => {
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {}
    fetchData();
  }, [project]);

  return <Grid container spacing={0}></Grid>;
};
export default ReportView;
