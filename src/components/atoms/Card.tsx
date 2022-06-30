import React from "react";
import { Card, CardActionArea, Typography, Tooltip } from "@mui/material";
import ContentMui from "@mui/material/CardContent";
import WorklogModalContent from "components/organisms/WorklogModal.styled";
import { WorklogForIssueDto } from "interfaces&Types/issueReturnIfaces/IssuesReturnRoot";

type CardProps = {
  worklog: WorklogForIssueDto;
};

const CardContent: React.FC<CardProps> = ({ worklog }) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <Card>
        <CardActionArea onClick={() => setModalOpen(true)}>
          <ContentMui>
            <Tooltip title="Description">
              <>
                <Typography gutterBottom component="h2">
                  {worklog.issueId}
                </Typography>
                <Typography gutterBottom component="h2">
                  {worklog.timeSpent}
                </Typography>
              </>
            </Tooltip>
            <Typography variant="body2" color="textSecondary" component="p">
              {worklog.commentText}
            </Typography>
          </ContentMui>
        </CardActionArea>
      </Card>
      <WorklogModalContent open={modalOpen} handleClose={() => setModalOpen(false)} worklog={worklog} />
    </>
  );
};

export default CardContent;
