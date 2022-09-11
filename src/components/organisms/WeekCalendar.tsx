import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ButtonIcon from 'components/atoms/ButtonIcon';
import { WeekDays } from 'state/constans/constans';
import { WorklogForIssueDto } from 'interfaces&Types/issueReturnIfaces/IsuesReturnRoot';
import Stack from 'components/molecules/Stack.styled';
import moment from 'moment';
import { v4 as uiudv4 } from 'uuid';

type WeekCalendarProps = {
  worklogs: WorklogForIssueDto[];
  startDate: moment.Moment;
  setStartDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
};
const WeekCalendar: React.FC<WeekCalendarProps> = ({ worklogs, startDate, setStartDate }) => {
  let dateHead = moment(startDate).add(-1);
  let dateBody = moment(startDate).add(-1);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {WeekDays.map((day, index) => {
              dateHead.add('1', 'days');

              return (
                <TableCell key={uiudv4()} align="center">
                  {dateHead.toDate().toDateString()}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            {WeekDays.map((day, index) => {
              dateBody.add('1', 'days');

              return (
                <TableCell key={uiudv4()} size="small">
                  <Stack
                    key={uiudv4()}
                    worklogs={worklogs.filter((w) => new Date(w.startedDT).getDate() === dateBody.toDate().getDate())}
                  />
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>

        <TableFooter style={{ display: 'flex', justifyContent: 'center' }}>
          <TableRow>
            <TableCell>
              <ButtonIcon
                onClick={() => {
                  startDate.add('-7', 'days');
                  setStartDate(moment(startDate.toDate()));
                }}>
                <ArrowBackIosIcon color="action" />
              </ButtonIcon>
            </TableCell>
            <TableCell>
              <ButtonIcon
                onClick={() => {
                  startDate.add('7', 'days');
                  setStartDate(moment(startDate.toDate()));
                }}>
                <ArrowForwardIosIcon color="action" />
              </ButtonIcon>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default WeekCalendar;
