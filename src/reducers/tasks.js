import transaction from './transaction'
import task from './task'
import {combineReducers} from 'redux'

const byId =  function(state = {}, action) {
  var newState
  switch (action.type) {
  case 'RECEIVE_TASKS':
    // server response with all the tasks
    return action.response.entities.tasks

  case 'UPDATE_TASK_STATUS':
    return {
      ...state,
      [action.taskId]: {
        ...state[action.taskId],
        status: action.status
      }
    }

  case 'UPDATE_TASK':
    // server response with one task updated/created
    newState = {
      ...state,
      ...action.response.entities.tasks
    }
    if(action.response.tmpId) delete newState[action.response.tmpId]
    return newState

  case 'CREATE_TASK':
    // task creation from client
    const { id, type, title, header = {}, articles = [] } = action.task
    return {
      ...state,
      [action.task.id]: {
        id, type, title, header, articles
      }
    }

  case 'DELETE_TASK':
    // task creation from client
    newState = {...state}
    delete newState[action.taskId]
    return newState

  default:
    return state
  }
};

const allIds = (state = [], action) => {
  switch(action.type){
  case 'RECEIVE_TASKS':
    return action.response.result

  case 'CREATE_TASK':
    // task creation from client
    return state.concat(action.task.id)

  case 'DELETE_TASK':
    return state.filter((id) => (id != action.taskId))

  case 'UPDATE_TASK':
    // server response with one task
    if(action.response.tmpId)
      return state
        .filter((id) => {
          return action.response.tmpId != id
        })
        .concat(action.response.result)

  default:
    return state;
  }
}

// export const getCurrentTask = (state) => {
//   return state.transactions[state.current]
// }

export const isBeingProcessed = (state, id) => {
  return typeof state.transactions[id] !== "undefined"
}

export default transaction(combineReducers({
  byId,
  allIds,
}), task)

export const getTasks = function(state){
  return state.tasks.allIds.map((id) => {
    return state.tasks.byId[id]
  });
}

export const getTask = function(state, taskId){
  return  state.transactions[state.current]
}

export const getArticles = function(state, taskId){
  return state.transactions[state.current].articles
}

export const getArticle = function(state, taskId, articleId){
  return state.transactions[state.current].articles
    .filter((article) => {
      return article.id == articleId
    })[0]
}

export const hasTaskChanged = function(state, taskId){
  return state.tasks.byId[taskId] !== state.transactions[taskId]
}