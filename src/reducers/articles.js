import {combineReducers} from 'redux'
import transaction from './transaction'

const byId =  function(state = {}, action) {
  let newState;
  switch (action.type) {
  case 'RECEIVE_TASKS':
    return action.response.entities.articles
  case 'UPDATE_QUANTITY':
    let id = action.articleId + "_" + action.taskId,
      article = state[id]
    if(article){
      newState = {...state}
      let newArticle = {...article}
      newArticle.quantity = action.quantity
      newState[id] = {...newArticle}
      return newState
    }
  default:
    return state
  }
};

const allIds = (state = {}, action) => {
  switch(action.type){
  case 'RECEIVE_TASKS':
    return Object.keys(action.response.entities.articles)
  default:
    return state;
  }
}

const articles = transaction(combineReducers({
  byId,
  allIds
}))

export default articles

export function hasChanges(state){
  return state.wip !== state.current
}