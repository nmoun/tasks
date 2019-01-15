
import {combineReducers} from 'redux'

const byId =  function(state = {}, action) {
  var newState, newId, newArticles;
  switch (action.type) {
  case 'RECEIVE_TASKS':
    // only the tasks present in the database must be displayed
    newState = {}
    action.response.forEach((task) => {
      newState[task.id] = task
    })
    return newState

  case 'UPDATE_QUANTITY': // UPDATE_QUANTITY, simple, no normalization etc
    newState = {...state}
    newState[action.taskId] = {...newState[action.taskId]}
    newArticles = newState[action.taskId].articles.map((article) => {
      return (article.id == action.articleId) ? {...article, quantity: action.quantity} : article
    })
    newState[action.taskId].articles = newArticles
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
  console.log('AALLLLOOOOOOO??' + JSON.stringify(action, null, 2))
    newState = {...state}
    newState[action.taskId] = {...newState[action.taskId]}
    newArticles = newState[action.taskId].articles.map((article) => {
      if(article.id == action.articleId) console.log('new qt: ' + parseInt(article.quantity, 10) + 1)
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
    return action.response.map((task) => (task.id))
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

export const getArticles = function(state, taskId){
  return state.tasks.byId[taskId].articles
}

export const getArticle = function(state, taskId, articleId){
  return state.tasks.byId[taskId].articles
    .filter((artId) => {
      return artId === articleId
    })[0]
}

export const getIsFetching = function(state){
  return state.isFetching;
}