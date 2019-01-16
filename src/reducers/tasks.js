
import transaction from './transaction'
import {combineReducers} from 'redux'

const byId =  function(state = {}, action) {
  var newState
  switch (action.type) {
  case 'RECEIVE_TASKS':
    newState = {}
    action.response.forEach((task) => {
      newState[task.id] = task
    })
    return newState

  case 'UPDATE_QUANTITY': 
    newState = {...state}
    newState[action.taskId] = {
      ...newState[action.taskId],
      articles: newState[action.taskId].articles.map((article) => {
        return (article.id == action.articleId) ? {...article, quantity: action.quantity} : article
      })
    }
    return newState

  case 'DELETE_ARTICLE': 
    newState = {...state}
    newState[action.taskId] = {
      ...newState[action.taskId],
      articles: newState[action.taskId].articles.filter((article) => {
        return (article.id !== action.articleId)
      })}
    return newState

  case 'ADD_ARTICLE': 
    newState = {...state}
    newState[action.taskId] = {
      ...newState[action.taskId],
      articles: newState[action.taskId].articles.concat({...action.article, quantity: 1})
    }
    return newState

  case 'INC_QUANTITY':
    newState = {...state}
    newState[action.taskId] = {
      ...newState[action.taskId],
      articles: newState[action.taskId].articles.map((article) => {
        return (article.id == action.articleId) ? {...article, quantity: parseInt(article.quantity, 10) + 1} : article
      })
    }
    return newState

  default:
    return state
  }
};

const allIds = (state = [], action) => {
  switch(action.type){
  case 'RECEIVE_TASKS':
    return action.response.map((task) => (task.id))
  default:
    return state;
  }
}

export default transaction(combineReducers({
  byId,
  allIds
}))

export const getTasks = function(state){
  return state.wip.allIds.map((id) => {
    return state.wip.byId[id]
  });
}

export const getTask = function(state, taskId){
  return state.wip.byId[taskId];
}

export const getArticles = function(state, taskId){
  return state.wip.byId[taskId].articles
}

export const getArticle = function(state, taskId, articleId){
  return state.wip.byId[taskId].articles
    .filter((artId) => {
      return artId === articleId
    })[0]
}

export const hasTaskChanged = function(state, taskId){
  return state.wip.byId[taskId] !== state.current.byId[taskId]
}