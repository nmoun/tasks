import { combineReducers } from 'redux'
import tasks from './tasks'
import * as fromTasks from './tasks'

export default combineReducers({
  tasks,
})

export const getTask = function(state, taskId){
  console.log("getTask selector: " + JSON.stringify(taskId))
  return fromTasks.getTask(state.tasks, taskId)
}

export const getTasks = function(state){
  return fromTasks.getTasks(state.tasks)
}

export const getIsFetching = function(state){
  return fromTasks.getIsFetching(state.tasks)
}
