import { ActionType } from 'state/action-types';
import { Action } from 'state/actions';

import { Dispatch } from 'redux';

export const addTask = (id: string, timeToAdd: string) => {
  return {
    type: ActionType.ADD_TASK,
    payload: {
      id: id,
      timeToAdd: timeToAdd,
    },
  };
};

export const deleteTask = (id: string) => {
  return {
    type: ActionType.DELETE_TASK,
    payload: {
      id: id,
    },
  };
};

export const updateTask = (id: string, timeToSet: string) => {
  return {
    type: ActionType.UPDATE_TASK,
    payload: {
      id: id,
      timeToSet: timeToSet,
    },
  };
};

export const setCalendarRerender = (show: boolean) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SHOW_MODAL_WORKLOG,
      payload: {
        show: show,
      },
    });
  };
};

export const updateStopwatch = (time: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.UPDATE_STOPWATCH_TIME,
      payload: {
        time: time,
      },
    });
  };
};

export const rerenderStopwatchItems = (rerender: boolean) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.RERENDER_STOPWATCH_ITEMS,
      payload: {
        rerender: rerender,
      },
    });
  };
};
