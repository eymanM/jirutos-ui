import { SaveAs } from '@mui/icons-material';
import { Button, InputBase } from '@mui/material';
import Stopwatch from 'components/molecules/Stopwatch';
import { StopwatchItemProps } from 'interfaces&Types/StopwatchItemProps';
import React from 'react';
import AddWorklogModalStyled from './AddWorklogModal.styled';

type RenderStopwatchItemProps = {
  stopwatchItems: StopwatchItemProps[];
  setStopwatchItems: React.Dispatch<React.SetStateAction<StopwatchItemProps[]>>;
  isNew: boolean;
  taskId?: string;
  typeName: string;
};

const RenderStopwatchItem: React.FC<RenderStopwatchItemProps> = ({
  stopwatchItems,
  setStopwatchItems,
  isNew,
  taskId,
  typeName,
}) => {
  const [taskIdLocal, setTaskIdLocal] = React.useState('');
  const [timeLocal, setTimeLocal] = React.useState<number>(stopwatchItems.find((x) => x.taskId === taskId)?.timeSpend || 0);
  const startState = React.useState(false);
  const [startted, _] = startState;
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (startted || !taskIdLocal) return;

    if (isNew) {
      setStopwatchItems([
        ...stopwatchItems,
        {
          taskId: taskIdLocal,
          timeSpend: timeLocal,
        },
      ]);
      setTimeLocal(0);
      setTaskIdLocal('');
    }
  }, [startted]);

  React.useEffect(() => {
    if (!isNew || !stopwatchItems.length || !taskId) return;
    setTaskIdLocal(taskId);
  }, []);

  return (
    <>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Paste task ID"
        value={taskIdLocal}
        onChange={(e) => setTaskIdLocal(e.target.value)}
      />
      <Button
        variant="outlined"
        color="secondary"
        endIcon={<SaveAs />}
        onClick={() => {
          setModalOpen(true);
        }}
        sx={{ mr: 1, maxWidth: 79, marginBlock: 1 }}>
        Save
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          const filteredItems = stopwatchItems.filter((x) => x.taskId !== taskIdLocal);
          setStopwatchItems(filteredItems);
        }}
        sx={{ maxWidth: 10, marginBlock: 1 }}>
        X
      </Button>
      <Stopwatch time={timeLocal} setTime={setTimeLocal} startState={startState} />
      <AddWorklogModalStyled
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        issueId={taskIdLocal}
        typeName={typeName}
        stopwatchItems={stopwatchItems}
        setStopwatchItems={setStopwatchItems}
        customField={typeName.substring(typeName.indexOf('/') + 1)}
      />
    </>
  );
};

export default RenderStopwatchItem;
