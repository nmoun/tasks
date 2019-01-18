import * as api from 'service/TaskService'
import {startFetchingTasks, stopFetchingTasks, displayNotification } from './ui'

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

export const deleteTask = (id) => {
  return {
    type: "DELETE_TASK",
    id,
  }
}

const updateTaskLocal = (response) => {
  return {
    type: "UPDATE_TASK",
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

export const updateTask = function(task){
  return function(dispatch){
    // dispatch(startFetchingTasks());
    return api.saveTask(task).then((response) => {
      dispatch(updateTaskLocal(response))
      dispatch(displayNotification("Task has been updated"))
    });
  };
}