import { combineReducers } from 'redux'
import tasks from './tasks'
import * as fromTasks from './tasks'
import articles from './articles'
import * as fromArticles from './articles'

export default combineReducers({
  tasks,
  articles
})

export const getTask = function(state, taskId){
  return fromTasks.getTask(state.tasks, taskId)
}

export const getTasks = function(state){
  return fromTasks.getTasks(state.tasks)
}

export const getIsFetching = function(state){
  return fromTasks.getIsFetching(state.tasks)
}

export const getArticles = function(state, taskId){
  return fromArticles.getArticles(state.articles, taskId)
}

export const getArticle = function(state, taskId, articleId){
  return fromArticles.getArticle(state.articles, taskId, articleId)
}

export const hasChanges = function(state){
  return fromArticles.hasChanges(state.articles)
}