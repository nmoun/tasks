import {combineReducers} from 'redux'

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

  case 'RECEIVE_ARTICLE':
    let quantity = (state[action.article.id + "_" + action.taskId]) ? parseInt(state[action.article.id + "_" + action.taskId].quantity, 10) + 1 : 1
    newState = {...state, [action.article.id + "_" + action.taskId]: {...action.article, quantity}}
    return newState

  case 'DELETE_ARTICLE':
    var idDelete = action.articleId + "_" + action.taskId
    newState = {...state}
    delete newState[idDelete]
    return newState
  default:
    return state
  }
};

const allIds = (state = {}, action) => {
  switch(action.type){
  case 'RECEIVE_TASKS':
    return Object.keys(action.response.entities.articles)
  case 'RECEIVE_ARTICLE':
    let newId = action.article.id + "_" + action.taskId,
      newState = (state.indexOf(newId) === -1) ? [...state].concat(newId) : [...state]
    return newState
  case 'DELETE_ARTICLE':
    return state.filter((id) => {
      return id !== action.articleId + "_" + action.taskId
    })
  default:
    return state;
  }
}

const articles = combineReducers({
  byId,
  allIds
})

export default articles