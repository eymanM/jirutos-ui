import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import ProjectExpandForFilter from 'components/molecules/ProjectExpandForFilter';
import StatusExpandForFilter from 'components/molecules/StatusExpandForFilter';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import OtherExpandForFilter from 'components/molecules/OtherExpandForFilter';
import AddWorklogModalStyled from 'components/organisms/AddWorklogModal.styled';
import { FilterIssues, UserIntegrations } from 'endpoint/endpointWorklogExecuter';
import { IssueForFilterModel } from 'interfaces&Types/IssueForFilterModel';
import { FilterDataModel } from 'interfaces&Types/issueReturnIfaces/FilterData';
import { TypeName } from 'interfaces&Types/SimpleTypes';
import { ClickUpUrl, JiraURL } from 'state/constans/constans';

const FilterView = () => {
  const [checkedProjects, setCheckedProjects] = React.useState<string[]>([]);
  const [checkedStatuses, setCheckedStatuses] = React.useState<string[]>([]);
  const [checkedOthers, setCheckedOthers] = React.useState<string[]>([]);
  const [filteredIssues, setFilteredIssues] = React.useState<IssueForFilterModel[]>([]);
  const [integrations, setIntegrations] = React.useState<TypeName[]>([]);
  const [integrationValue, setIntegrationValue] = React.useState<string>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [startedTask, setStartedTask] = React.useState<IssueForFilterModel>();

  React.useEffect(() => {
    async function fetch() {
      const res = await UserIntegrations('ironoth12@gmail.com');
      setIntegrations(res);
      let value = `${res[0].type}/${res[0].name}`;
      setIntegrationValue(value);
    }
    fetch();
  }, []);

  React.useEffect(() => {
    setFilteredIssues([]);
  }, [integrationValue]);

  React.useEffect(() => {
    async function fetch() {
      if (!integrationValue) return;
      if ([checkedProjects, checkedStatuses, checkedOthers].every((e) => e?.length === 0)) return;

      const filterData: FilterDataModel = {
        projects: checkedProjects,
        statuses: checkedStatuses,
        others: checkedOthers,
      };
      const res = await FilterIssues(integrationValue, filterData);
      setFilteredIssues(res);
    }
    fetch();
  }, [checkedProjects, checkedStatuses, checkedOthers]);

  return (
    <>
      {integrationValue && (
        <>
          <FormLabel id={uuidv4()}>Integration</FormLabel>
          <RadioGroup
            row
            value={integrationValue}
            onChange={(e) => {
              setCheckedProjects([]);
              setCheckedStatuses([]);
              setCheckedOthers([]);
              setIntegrationValue((e.target as HTMLInputElement).value);
            }}>
            {integrations.map((inte, i) => {
              let value = `${inte.type}/${inte.name}`;
              return <FormControlLabel value={value} control={<Radio />} label={value} />;
            })}
          </RadioGroup>
          <Grid container spacing={5}>
            <Grid item xs={3}>
              <ProjectExpandForFilter
                checkedProjects={checkedProjects}
                setCheckedProjects={setCheckedProjects}
                integration={integrationValue}
              />
              <StatusExpandForFilter
                checkedStatuses={checkedStatuses}
                setCheckedStatuses={setCheckedStatuses}
                integration={integrationValue}
              />
              <OtherExpandForFilter checkedOthers={checkedOthers} setCheckedOther={setCheckedOthers} />
            </Grid>
            <Grid item xs={9}>
              {filteredIssues.map((issue) => (
                <Card style={{ margin: '7px' }}>
                  <CardActionArea
                    onClick={() => {
                      issue.type === 'Jira' && window.open(JiraURL(issue.integrationName) + /browse/ + issue.key);
                      issue.type === 'ClickUp' && window.open(ClickUpUrl() + /t/ + issue.issueId);
                    }}>
                    <CardContent>
                      <Box sx={{ flexDirection: 'row', display: 'flex' }}>
                        <Typography gutterBottom component="h2" style={{ alignSelf: 'center', marginRight: '10px' }}>
                          {issue.key}
                        </Typography>
                        <Box src={issue.priorityImage} component="img" maxHeight={50} left={'90px'} />
                        <Button
                          style={{ marginInline: 50 }}
                          onClick={(e) => {
                            setStartedTask(issue);
                            e.stopPropagation();
                            setModalOpen(true);
                          }}
                          variant="outlined">
                          Add work log
                        </Button>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        {issue.summary}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Grid>
            <AddWorklogModalStyled
              open={modalOpen}
              handleClose={() => setModalOpen(false)}
              issueId={startedTask?.issueId || ''}
              customField={startedTask?.customField || ''}
              typeName={integrationValue}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default FilterView;
