import { stat } from "fs";
import produce from "immer";
import { ActionType } from "state/action-types";
import { Action } from "state/actions";
import { IssueTaskTime } from "state/IssueTaskTime";

interface TaskState {
  loading: boolean
  error: string | null
  order: string[]
  openModalWorklog: boolean
  data: {
    [key: string]: IssueTaskTime
  }
}

const initialState: TaskState = {
  loading: false,
  error: null,
  order: [],
  openModalWorklog: false,
  data: {}
}

const reducer = (state: TaskState = initialState, action: Action): TaskState => {
  switch (action.type) {
    case ActionType.SHOW_MODAL_WORKLOG:
      return { loading: false, error: null, order: [], openModalWorklog: action.payload.show, data: {} }
    default:
      return state   
  }
}

export default reducer;