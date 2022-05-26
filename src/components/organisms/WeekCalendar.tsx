import React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ButtonIcon from 'components/atoms/ButtonIcon';
import { WeekDays } from 'state/constans/constans';
import { WorklogForIssueDto } from 'interfaces&Types/issueReturnIfaces/issuesReturnRoot';
import Stack from 'components/molecules/Stack.styled';
import moment from 'moment';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useActions } from 'hooks/useActions';

type WeekCalendarProps = {
  worklogs: WorklogForIssueDto[],
  startDate: moment.Moment,
}
const WeekCalendar: React.FC<WeekCalendarProps> = ({ worklogs, startDate }) => {
  let dateHead = moment(startDate)
  let dateBody = moment(startDate)
  const { updateShowModalWorklog } = useActions();
  const { openModalWorklog } = useTypedSelector(
    (state) => state.tasks
  );

  return (
    <TableContainer component={Paper}>
      <Table >
        <TableHead>
          <TableRow >
            {WeekDays.map((day, index) => {
              {dateHead.add('1', 'days')}
               return <TableCell align='center'>
                {dateHead.toDate().toDateString()}
              </TableCell>})
            }
          </TableRow>
        </TableHead>

        <TableBody>
          {WeekDays.map((day, index) => {
            {dateBody.add('1', 'days')}
            return <TableCell size='small'>
              <Stack worklogs={worklogs.filter(w => new Date(w.startedDT).getDate() === dateBody.toDate().getDate())} />
            </TableCell>
            }
          )}
        </TableBody>
        
        <TableFooter style={{ display: 'flex', justifyContent: 'center' }} >
          <ButtonIcon>
            <ArrowBackIosIcon color='action' />
          </ButtonIcon>
          <ButtonIcon>
            <ArrowForwardIosIcon color='action' />
          </ButtonIcon>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default WeekCalendar;
