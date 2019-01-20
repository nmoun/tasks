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

export const updateTaskStatus = (taskId, status) =>{
  return  {
    type: "UPDATE_TASK_STATUS",
    taskId,
    status,
  }
}

const updateTaskLocal = (response) => {
  return {
    type: "UPDATE_TASK",
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
    dispatch(updateTaskStatus(task.id, TASK_STATUS.LOADING));
    dispatch(saveChanges());
    return api
      .saveTask(task)
      .then((response) => {
        setTimeout(() => {
          dispatch(updateTaskLocal(response))
          dispatch(displayNotification("Task has been updated"))
        }, 2000)
      })
      .catch(() => {
        dispatch(displayNotification("Error occured while saving the task", 'error'))
      });
  };
}