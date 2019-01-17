import * as api from 'service/TaskService'
import {startFetchingTasks, stopFetchingTasks} from './ui'

export const receiveTasks = (response) => {
  return {
    type: "RECEIVE_TASKS",
    response
  }
}

export const fetchTasks = function(){
  return function(dispatch){
    dispatch(startFetchingTasks());
    return api.fetchTasks().then((response) => {
      dispatch(receiveTasks(response))
      setTimeout(() => {dispatch(stopFetchingTasks());}, 500)
    });
  };
}