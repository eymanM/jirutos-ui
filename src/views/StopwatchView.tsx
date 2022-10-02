import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
import RenderStopwatchItem from 'components/organisms/StopwatchItem';
import { UserIntegrations } from 'endpoint/endpointWorklogExecuter';
import { TypeName } from 'interfaces&Types/SimpleTypes';
import { StopwatchItemProps } from 'interfaces&Types/StopwatchItemProps';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const StopwatchView = () => {
  const [stopwatchItems, setStopwatchItems] = React.useState<StopwatchItemProps[]>([]);
  const [integrations, setIntegrations] = React.useState<TypeName[]>([]);
  const [integrationValue, setIntegrationValue] = React.useState<string>();

  React.useEffect(() => {
    async function fetch() {
      const res = await UserIntegrations('ironoth12@gmail.com');
      setIntegrations(res);
      let value = `${res[0].type}/${res[0].name}`;
      setIntegrationValue(value);
    }
    fetch();
  }, []);

  return (
    <>
      {integrationValue && (
        <>
          <FormLabel id={uuidv4()}>Integration</FormLabel>
          <RadioGroup
            row
            value={integrationValue}
            onChange={(e) => {
              setIntegrationValue((e.target as HTMLInputElement).value);
            }}>
            {integrations.map((inte, i) => {
              let value = `${inte.type}/${inte.name}`;
              return <FormControlLabel value={value} control={<Radio />} label={value} />;
            })}
          </RadioGroup>
          <Grid container spacing={5}>
            <Grid item xs={5}>
              <RenderStopwatchItem
                key={'new'}
                stopwatchItems={stopwatchItems}
                setStopwatchItems={setStopwatchItems}
                isNew={true}
                typeName={integrationValue}
              />
            </Grid>
            <Grid item xs={5}>
              {stopwatchItems.map(({ taskId, timeSpend }) => (
                <RenderStopwatchItem
                  key={taskId}
                  stopwatchItems={stopwatchItems}
                  setStopwatchItems={setStopwatchItems}
                  isNew={true}
                  typeName={integrationValue}
                  taskId={taskId}
                />
              ))}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default StopwatchView;
