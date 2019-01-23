import * as api from 'service/TaskService'
import { startFetchingTasks, stopFetchingTasks, displayNotification } from './ui'
import { saveChanges } from './transaction'
import { TASK_STATUS } from 'utils/constants'

export const receiveTasks = (response) => {
  return {
    type: "RECEIVE_TASKS",
    response
  }
}

export const createTask = (task) => {
  return {
    type: "CREATE_TASK",
    task,
  }
}

export const deleteTask = (taskId) => {
  return {
    type: "DELETE_TASK",
    taskId,
  }
}

export const updateTask = (taskId, fields) =>{
  return  {
    type: "UPDATE_TASK",
    taskId,
    fields,
  }
}

const receiveTask = (response) => {
  return {
    type: "RECEIVE_TASK",
    response
  }
}

/**
 * Fetch all the tasks
 */
export const fetchTasks = function(){
  return function(dispatch){
    dispatch(startFetchingTasks());
    return api
      .fetchTasks()
      .then((response) => {
        dispatch(receiveTasks(response))
        setTimeout(() => {dispatch(stopFetchingTasks());}, 750)
      })
      .catch(() => {
        dispatch(stopFetchingTasks());
        dispatch(displayNotification("Error occured while fetching tasks", 'error'))
      });
  };
}

/**
 * Creates/updates task
 * @param {*} task 
 */
export const saveTask = function(task){
  return function(dispatch){
    dispatch(updateTask(task.id, {...task, status: TASK_STATUS.LOADING}));
    dispatch(saveChanges());
    return api
      .saveTask(task)
      .then((response) => {
        setTimeout(() => {
          dispatch(receiveTask(response))
          dispatch(deleteTask(response.tmpId))
          dispatch(displayNotification("Task has been updated"))
        }, 2000)
      })
      .catch(() => {
        dispatch(updateTask(task.id, {status: null}))
        dispatch(displayNotification("Error occured while saving the task", 'error'))
      });
  };
}