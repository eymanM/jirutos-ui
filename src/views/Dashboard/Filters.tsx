import React from "react";
import StatusExpandForFilter from "components/molecules/StatusExpandForFilter";
import ProjectExpandForFilter from "components/molecules/ProjectExpandForFilter";
import { Card, CardActionArea, Grid, CardContent, Tooltip, Typography, Box } from "@mui/material";

import { FilterIssuesByJql } from "endpoint/endpointWorklogExecuter";
import { IssueForFilterModel } from "interfaces&Types/IssueForFilterModel";
import { JiraURL } from "state/constans/constans";
import OtherExpandForFilter from "components/molecules/OtherExpandForFilter";

const FilterView = () => {
  const [checkedProjects, setCheckedProjects] = React.useState<string[]>([]);
  const [checkedStatuses, setCheckedStatuses] = React.useState<string[]>([]);
  const [checkedOthers, setCheckedOthers] = React.useState<string[]>([]);
  const [filteredIssues, setFilteredIssues] = React.useState<IssueForFilterModel[]>([]);
  const projects = checkedProjects[0] ? `project in (${checkedProjects.join(",")})` : "";
  const statuses = checkedStatuses[0] ? `status in (${checkedStatuses.join(",")})` : "";
  const filters: string[] = [];

  if (projects) filters.push(projects);
  if (statuses) filters.push(statuses);
  if (checkedOthers[0]) filters.push(checkedOthers.join(" AND "));

  const jql = filters.join(" AND ");

  React.useEffect(() => {
    async function fetch() {
      const res = await FilterIssuesByJql("Jira/psw-inzynierka", jql);
      setFilteredIssues(res);
    }
    fetch();
  }, [jql]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={3}>
        <ProjectExpandForFilter checkedProjects={checkedProjects} setCheckedProjects={setCheckedProjects} />
        <StatusExpandForFilter checkedStatuses={checkedStatuses} setCheckedStatuses={setCheckedStatuses} />
        <OtherExpandForFilter checkedOthers={checkedOthers} setCheckedOther={setCheckedOthers} />
      </Grid>
      <Grid item xs={9}>
        {filteredIssues.map((issue) => (
          <Card style={{ margin: "7px" }}>
            <CardActionArea onClick={() => window.open(JiraURL(issue.integrationName) + /browse/ + issue.key)}>
              <CardContent>
                <Box sx={{ flexDirection: "row", display: "flex" }}>
                  <Typography gutterBottom component="h2" style={{ alignSelf: "center", marginRight: "10px" }}>
                    {issue.key}
                  </Typography>
                  <Box src={issue.priorityImage} component="img" maxHeight={50} left={"90px"} />
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {issue.summary}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};

export default FilterView;
