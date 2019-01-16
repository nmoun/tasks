import { combineReducers } from 'redux'
import tasks from './tasks'
import ui from './ui'
import * as fromTasks from './tasks'
import * as fromUI from './ui'

export default combineReducers({
  tasks,
  ui
})

export const getTask = function(state, taskId){
  return fromTasks.getTask(state.tasks, taskId)
}

export const getTasks = function(state){
  return fromTasks.getTasks(state.tasks)
}

export const getArticles = function(state, taskId){
  return fromTasks.getArticles(state.tasks, taskId)
}

export const getArticle = function(state, taskId, articleId){
  return fromTasks.getArticle(state.tasks, taskId, articleId)
}

export const hasTaskChanged = function(state, taskId){
  return fromTasks.hasTaskChanged(state.tasks, taskId)
}

export const getIsFetching = function(state){
  return fromUI.getIsFetching(state.ui)
}