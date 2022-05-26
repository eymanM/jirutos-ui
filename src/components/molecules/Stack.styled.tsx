import React from 'react'
import Stack from '@mui/material/Stack';
import { styled } from '@mui/styles';
import Card from 'components/atoms/Card'
import { WorklogForIssueDto } from 'interfaces&Types/issueReturnIfaces/issuesReturnRoot';

const StyledStack = styled(Stack)({
  border: 0,
});

type StackContentProps = {
  worklogs: WorklogForIssueDto[]
}

const StackContent: React.FC<StackContentProps> = ({ worklogs }) => {

  return(
    <StyledStack spacing={2} >
      {worklogs.map(w => {
        return <Card issueId={w.issueId} timeSpent={w.timeSpent} comment={w.commentText} />
      })}
   </StyledStack>
  );
};

export default StackContent;
