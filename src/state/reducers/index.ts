import { combineReducers } from 'redux'
import taskReducer from 'state/reducers/taskReducer'

const reducers = combineReducers({
  tasks: taskReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>