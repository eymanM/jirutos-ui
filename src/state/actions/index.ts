import { ActionType } from 'state/action-types';

interface AddTaskAction {
  type: ActionType.ADD_TASK;
  payload: {
    id: string;
    timeToAdd: string;
  };
}

interface DeleteTaskAction {
  type: ActionType.DELETE_TASK;
  payload: {
    id: string;
  };
}

interface UpdateTaskAction {
  type: ActionType.UPDATE_TASK;
  payload: {
    id: string;
    timeToSet: string;
  };
}

interface ShowModalWorklog {
  type: ActionType.SHOW_MODAL_WORKLOG;
  payload: {
    show: boolean;
  };
}

interface UpdateStopwatchTime {
  type: ActionType.UPDATE_STOPWATCH_TIME;
  payload: {
    time: number;
  };
}

interface RerenderStopwatchItems {
  type: ActionType.RERENDER_STOPWATCH_ITEMS;
  payload: {
    rerender: boolean;
  };
}

export type Action =
  | AddTaskAction
  | DeleteTaskAction
  | UpdateTaskAction
  | ShowModalWorklog
  | UpdateStopwatchTime
  | RerenderStopwatchItems;
