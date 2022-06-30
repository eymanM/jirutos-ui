import React from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/styles";
import Card from "components/atoms/Card";
import { WorklogForIssueDto } from "interfaces&Types/issueReturnIfaces/IssuesReturnRoot";
import { v4 as uuidv4 } from "uuid";
const StyledStack = styled(Stack)({
  border: 0,
});

type StackContentProps = {
  worklogs: WorklogForIssueDto[];
};

const StackContent: React.FC<StackContentProps> = ({ worklogs }) => {
  return (
    <StyledStack spacing={2}>
      {worklogs.map((w) => {
        return <Card key={uuidv4()} worklog={w} />;
      })}
    </StyledStack>
  );
};

export default StackContent;
