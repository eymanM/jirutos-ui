import { ActionType } from 'state/action-types';
import { Action } from 'state/actions';
import { IssueTaskTime } from 'state/IssueTaskTime';

interface TaskState {
  loading: boolean;
  error: string | null;
  order: string[];
  rerenderCalendar: boolean;
  rerenderStopwatchItems: boolean;
  stopwatchSeconds: number;
  data: {
    [key: string]: IssueTaskTime;
  };
}

const initialState: TaskState = {
  loading: false,
  error: null,
  order: [],
  rerenderCalendar: false,
  rerenderStopwatchItems: false,
  stopwatchSeconds: 0,
  data: {},
};

const reducer = (state: TaskState = initialState, action: Action): TaskState => {
  switch (action.type) {
    case ActionType.SHOW_MODAL_WORKLOG:
      return {
        loading: false,
        error: null,
        order: [],
        rerenderCalendar: action.payload.show,
        rerenderStopwatchItems: false,
        data: {},
        stopwatchSeconds: 0,
      };
    case ActionType.UPDATE_STOPWATCH_TIME:
      return {
        loading: false,
        error: null,
        order: [],
        rerenderCalendar: false,
        rerenderStopwatchItems: false,
        data: {},
        stopwatchSeconds: action.payload.time,
      };
    case ActionType.RERENDER_STOPWATCH_ITEMS:
      return {
        loading: false,
        error: null,
        order: [],
        rerenderCalendar: false,
        rerenderStopwatchItems: action.payload.rerender,
        data: {},
        stopwatchSeconds: 0,
      };
    default:
      return state;
  }
};

export default reducer;
