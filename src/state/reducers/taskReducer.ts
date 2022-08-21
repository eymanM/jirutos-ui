import { ActionType } from 'state/action-types';
import { Action } from 'state/actions';
import { IssueTaskTime } from 'state/IssueTaskTime';

interface TaskState {
  loading: boolean;
  error: string | null;
  order: string[];
  rerenderCalendar: boolean;
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
  stopwatchSeconds: 0,
  data: {},
};

const reducer = (state: TaskState = initialState, action: Action): TaskState => {
  switch (action.type) {
    case ActionType.SHOW_MODAL_WORKLOG:
      return { loading: false, error: null, order: [], rerenderCalendar: action.payload.show, data: {}, stopwatchSeconds: 0 };
    case ActionType.UPDATE_STOPWATCH_TIME:
      return { loading: false, error: null, order: [], rerenderCalendar: false, data: {}, stopwatchSeconds: action.payload.time };
    default:
      return state;
  }
};

export default reducer;
