import * as api from 'service/TaskService'

export const receiveTasks = (tasks) => {
  return {
    type: "RECEIVE_TASKS",
    tasks
  }
}

const startFetching = () => {
  return {
    type: "START_FETCHING"
  }
}

const stopFetching = () => {
  return {
    type: "STOP_FETCHING"
  }
}

export const fetchTasks = function(){
  return function(dispatch){
    dispatch(startFetching());
    return api.fetchTasks().then((tasks) => {
      dispatch(receiveTasks(tasks))
      dispatch(stopFetching());
    });
  };
}