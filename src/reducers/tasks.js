
import {combineReducers} from 'redux'

const byId =  function(state = {}, action) {
  var newState, newId, newArticles;
  switch (action.type) {
  case 'RECEIVE_TASKS':
    // only the tasks present in the database must be displayed
    return {...action.response.entities.tasks}
  case 'RECEIVE_ARTICLE':
    newState = {...state}
    newId = action.article.id + "_" + action.taskId
    newState[action.taskId] = {...newState[action.taskId]}
    newState[action.taskId].articles = (newState[action.taskId].articles.indexOf(newId) === -1) ?
      newState[action.taskId].articles.concat(newId) : newState[action.taskId].articles
    return newState

  case 'DELETE_ARTICLE':
    newState = {...state}
    newId = action.articleId + "_" + action.taskId
    newState[action.taskId] = {...newState[action.taskId], articles: newState[action.taskId].articles.filter((id) => (id !== newId))}
    return newState

  case 'NON_EXISTANT_ACTION_UPDATE_QUANTITY': // UPDATE_QUANTITY, simple, no normalization etc
    newState = {...state}
    newState[action.taskId] = {...newState[action.taskId]}
    newArticles = newState[action.taskId].articles.map((article) => {
      return (article.id == action.articleId) ? {...article, quantity: action.quantity} : article
    })
    newState[action.taskId].articles = newArticles
    return newState

  case 'NON_EXISTANT_ACTION_DELETE_ARTICLE': 
    newState = {...state}
    newState[action.taskId] = {
      ...newState[action.taskId],
      articles: newState[action.taskId].articles.filter((article) => {
        return (article.id !== action.articleId)
      })}
    return newState

  case 'NON_EXISTANT_ACTION_ADD_ARTICLE': 
    newState = {...state}
    newState[action.taskId] = {
      ...newState[action.taskId],
      articles: newState[action.taskId].articles.concat(action.article)
    }
    return newState

  case 'NON_EXISTANT_ACTION_INC_QUANTITY':
    newState = {...state}
    newState[action.taskId] = {...newState[action.taskId]}
    newArticles = newState[action.taskId].articles.map((article) => {
      return (article.id == action.articleId) ? {...article, quantity: parseInt(article.quantity, 10) + 1} : article
    })
    newState[action.taskId].articles = newArticles
    return newState

  default:
    return state
  }
};

const allIds = (state = [], action) => {
  switch(action.type){
  case 'RECEIVE_TASKS':
    return action.response.result
  default:
    return state;
  }
}

const tasks = combineReducers({
  byId,
  allIds
})

const isFetching = function(state = false, action){
  switch (action.type) {
  case 'START_FETCHING':
    return true
  case 'STOP_FETCHING':
    return false
  default:
    return state
  }
}

export default combineReducers({
  tasks,
  isFetching
})

export const getTasks = function(state){
  return state.tasks.allIds.map((id) => {
    return state.tasks.byId[id]
  });
}

export const getTask = function(state, taskId){
  return state.tasks.byId[taskId];
}

export const getArticles = function(state, articles, taskId){
  return state.tasks.byId[taskId].articles.map((articleId) => {
    return articles.byId[articleId]
  })
}

export const getArticle = function(state, articles, taskId, articleId){
  return state.tasks.byId[taskId].articles
    .filter((artId) => {
      return artId === articleId + "_" + taskId
    })
    .map((artId) => {
      return articles.byId[artId]
    })[0]
}

export const getIsFetching = function(state){
  return state.isFetching;
}