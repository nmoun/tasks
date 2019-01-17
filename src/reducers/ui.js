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

const notification = function(state = {}, action){
  switch (action.type) {
  case 'DISPLAY_NOTIFICATION':
    return {
      isDisplayed: true,
      message: action.message,
      status: action.status
    }
  case 'HIDE_NOTIFICATION':
    return {
      isDisplayed: false,
    }
  default:
    return state
  }
}

export default combineReducers({
  isFetchingTasks,
  notification
})

export const getIsFetching = function(state){
  return state.isFetchingTasks;
}

export const getNotification = function(state){
  return state.notification;
}