import { combineReducers } from 'redux'
import tasks from './tasks'
import * as fromTasks from './tasks'
import articles from './articles'
import transaction from './transaction'

export default transaction(combineReducers({
  tasks,
  // articles
}))

export const getTask = function(state, taskId){
  return fromTasks.getTask(state.wip.tasks, taskId)
}

export const getTasks = function(state){
  return fromTasks.getTasks(state.wip.tasks)
}

export const getIsFetching = function(state){
  return fromTasks.getIsFetching(state.wip.tasks)
}

export const getArticles = function(state, taskId){
  return fromTasks.getArticles(state.wip.tasks, taskId)
}

export const getArticle = function(state, taskId, articleId){
  return fromTasks.getArticle(state.wip.tasks, taskId, articleId)
}

export const hasChanges = function(state){
  return state.wip !== state.current
}