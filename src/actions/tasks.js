import * as api from 'service/TaskService'

const receiveTasks = (tasks) => {
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

export const fetchTasks = function(){
  return function(dispatch){
    dispatch(startFetching());
    return api.fetchTasks().then((tasks) => {
      dispatch(receiveTasks(tasks))
    });
  };
}