import {combineReducers} from 'redux'
import transaction from './transaction'

const byId =  function(state = {}, action) {
  let newState;
  switch (action.type) {
  case 'RECEIVE_TASKS':
    newState = {...state}
    action.tasks.forEach(task => {
      if(task.content && task.content.articles){
        newState[task.id] = {}
        task.content.articles.forEach((article) => {
          newState[task.id][article.id] = {...article}
        })
      }
    });
    return newState
  case 'UPDATE_QUANTITY':
    newState = {...state}
    let article = newState[action.taskId][action.articleId]
    if(article){
      let newArticle = {...article}
      newArticle.quantity = action.quantity
      newState[action.taskId] = {...newState[action.taskId], [action.articleId]: newArticle}
    }
    return newState
  default:
    return state
  }
};

const allIds = (state = {}, action) => {
  switch(action.type){
  case 'RECEIVE_TASKS':
    let newState = {...state}
    action.tasks.forEach((task) => {
      newState[task.id] = (task.content && task.content.articles) ? task.content.articles.map((article) => {
        return article.id
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
    state.wip.allIds[taskId].map((articleId) => {
      return state.wip.byId[taskId][articleId]
    }) : []
}

export function getArticle(state, taskId, articleId){
  return state.wip.byId[taskId][articleId]
}

export function hasChanges(state){
  return state.wip !== state.current
}