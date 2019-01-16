import { combineReducers } from 'redux'

const isFetchingTasks = function(state = false, action){
  switch (action.type) {
  case 'START_FETCHING_TASKS':
    return true
  case 'STOP_FETCHING_TASKS':
    return false
  default:
    return state
  }
}

export default combineReducers({
  isFetchingTasks
})

export const getIsFetching = function(state){
  return state.isFetchingTasks;
}