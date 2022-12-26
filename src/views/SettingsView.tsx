import { Delete, Info, Save } from '@mui/icons-material';
import { Box, Grid, IconButton, List, ListItem, ListItemText, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';

import { UserIntegrations } from 'endpoint/endpointWorklogExecuter';
import { TypeName } from 'interfaces&Types/SimpleTypes';

const SettingsView = () => {
  const [integrations, setIntegrations] = React.useState<TypeName[]>([]);

  React.useEffect(() => {
    async function fetch() {
      const res = await UserIntegrations();
      setIntegrations(res);
    }
    fetch();
    return () => {
      return;
    };
  }, []);

  const tooltipText = `Type = Jira or ClickUp \n
Name = In case if Jira it's jira cloud name / organization name \n
but in case of ClickUp it's team ID (8 digits)`;

  return (
    <Grid container spacing={5}>
      <Grid item xs={3} sx={{ marginInline: '2%' }}>
        <List
          sx={{ width: '100%', maxWidth: 310, bgcolor: 'background.paper' }}
          subheader={
            <Typography sx={{ mt: 4, mb: 2, flexDirection: 'row', display: 'flex' }} variant="h6" component="div">
              <>{'Integrations: {Type} / {Name}'}</>
              <Tooltip title={tooltipText}>
                <IconButton size="small" style={{ alignSelf: 'start', alignItems: 'self-start' }}>
                  <Info fontSize="small" />
                </IconButton>
              </Tooltip>
            </Typography>
          }>
          {integrations.map(({ type, name }) => {
            return (
              <ListItem
                key={name}
                secondaryAction={
                  <IconButton
                    onClick={() => {
                      setIntegrations((prev) => {
                        const filteredIntegrations = prev.filter((i) => i.name !== name && i.type !== type);
                        return filteredIntegrations;
                      });
                    }}>
                    <Delete />
                  </IconButton>
                }>
                <ListItemText primary={`${type} / ${name}`} />
              </ListItem>
            );
          })}
          <Box sx={{ flexDirection: 'row', display: 'flex', m: 0 }}>
            <ListItem sx={{ flexDirection: 'column', display: 'flex' }} key={'new'}>
              <TextField label="{Type} / {Name}" variant="standard" />
              <TextField label="API Key" variant="standard" />
            </ListItem>
            <IconButton style={{ top: 11, alignSelf: 'center' }}>
              <Save />
            </IconButton>
          </Box>
        </List>
      </Grid>
    </Grid>
  );
};
export default SettingsView;
