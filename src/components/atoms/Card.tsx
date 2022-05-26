import React from "react";
import { Card, CardActionArea, Typography, Tooltip } from "@mui/material";
import ContentMui from "@mui/material/CardContent";
import WorklogModalContent from "components/organisms/WorklogModal.styled";

type CardProps = {
  issueId: string;
  timeSpent: string;
  comment: string | null;
};

const CardContent: React.FC<CardProps> = ({ issueId, timeSpent, comment }) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <Card>
        <CardActionArea onClick={() => setModalOpen(true)}>
          <ContentMui>
            <Tooltip title="Description">
              <>
                <Typography gutterBottom component="h2">
                  {issueId}
                </Typography>
                <Typography gutterBottom component="h2">
                  {timeSpent}
                </Typography>
              </>
            </Tooltip>
            <Typography variant="body2" color="textSecondary" component="p">
              {comment}
            </Typography>
          </ContentMui>
        </CardActionArea>
      </Card>
      <WorklogModalContent
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default CardContent;
