import {combineReducers} from 'redux'
import transaction from './transaction'

const byId =  function(state = {}, action) {
  let newState;
  switch (action.type) {
  case 'RECEIVE_TASKS':
    newState = {...state}
    action.tasks.forEach(task => {
      if(task.content && task.content.articles){
        task.content.articles.forEach((article) => {
          let joinId = "" + task.id + article.id;
          newState[joinId] = {...article}
        })
      }
    });
    return newState
  case 'UPDATE_QUANTITY':
    newState = {...state}
    let joinId = "" + action.taskId + action.articleId,
      article = newState[joinId]
    if(article){
      let newArticle = {...article}
      newArticle.quantity = action.quantity
      newState[joinId] = newArticle
    }
    return newState
  default:
    return state
  }
};

const allIds = (state = {}, action) => {
  switch(action.type){
  case 'RECEIVE_TASKS':
    let newState = {}
    action.tasks.forEach((task) => {
      newState[task.id] = (task.content && task.content.articles) ? task.content.articles.map((article) => {
        return "" + task.id + article.id
      }) : []
    })
    return newState
  default:
    return state;
  }
}

const articles = transaction(combineReducers({
  byId,
  allIds
}))

export default articles

export function getArticles(state, taskId){
  return state.wip.allIds[taskId] ?
    state.wip.allIds[taskId].map((joinId) => {
      return state.wip.byId[joinId]
    }) : []
}