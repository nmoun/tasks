import * as api from 'service/TaskService'
import {startFetchingTasks, stopFetchingTasks} from './ui'

export const receiveTasks = (tasks) => {
  return {
    type: "RECEIVE_TASKS",
    response: tasks
  }
}

export const fetchTasks = function(){
  return function(dispatch){
    dispatch(startFetchingTasks());
    return api.fetchTasks().then((tasks) => {
      dispatch(receiveTasks(tasks))
      setTimeout(() => {dispatch(stopFetchingTasks());}, 400)
      // dispatch(stopFetchingTasks());
    });
  };
}