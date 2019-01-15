
import {combineReducers} from 'redux'


const byId =  function(state = {}, action) {
  switch (action.type) {
  case 'RECEIVE_TASKS':
    // only the tasks present in the database must be displayed
    return {...action.response.entities.tasks}
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
    return articles.wip.byId[articleId]
  })
}

export const getArticle = function(state, articles, taskId, articleId){
  return state.tasks.byId[taskId].articles
    .filter((artId) => {
      return artId === articleId + "_" + taskId
    })
    .map((artId) => {
      return articles.wip.byId[artId]
    })[0]
}

export const getIsFetching = function(state){
  return state.isFetching;
}