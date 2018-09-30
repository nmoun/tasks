import { combineReducers } from 'redux'
import tasks from './tasks'
import * as fromTasks from './tasks'

export default combineReducers({
  tasks,
})

export const getTasks = function(state){
  return fromTasks.getTasks(state.tasks)
}

export const getIsFetching = function(state){
  return fromTasks.getIsFetching(state.tasks)
}
