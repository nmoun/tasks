// import transaction from './transaction'
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

/**
 * Notes: only one ongoing transaction at any moment, identified by id.
 * {
 *  current: 15, // current object being modified
 *  transactions: {
 *    15: {
 *      id: 15,
 *      ...
 *    },
 *    47: {
 *      ...
 *    }
 *  }
 * }
 * @param {*} state 
 * @param {Object} action 
 * @param {String} action.id
 * @param {Object} action.object
 */
const transactions = (state = {}, action) => {
  switch (action.type) {
  case 'DISCARD':
    // discard changes of current transaction
    let newTransactions = {...state.transactions}
    delete newTransactions[state.current]
    return {
      current: null,
      transactions: newTransactions
    }
  case 'START_TRANSACTION':
    return {
      current: action.id, // id of the object
      transactions: {...state.transactions, [action.id]: action.object},
    }
  case 'STOP_TRANSACTION':
    // Case when the object is no longer in the current transaction but is still being processed
    return {
      current: null,
      transactions: {...state.transactions}
    }

  case 'ADD_ARTICLE': 
    return {
      current: state.current,
      transactions: {
        ...state.transactions,
        [state.current]: {
          ...state.transactions[state.current],
          articles: state.transactions[state.current].articles.concat({...action.article, quantity: 1})
        }
      }
    }

  case 'DELETE_ARTICLE': 
    return {
      current: state.current,
      transactions: {
        ...state.transactions,
        [state.current]: {
          ...state.transactions[state.current],
          articles: state.transactions[state.current].articles.filter((article) => {
            return (article.id !== action.articleId)
          })
        }
      }
    }

  case 'UPDATE_QUANTITY': 
    return {
      current: state.current,
      transactions: {
        ...state.transactions,
        [state.current]: {
          ...state.transactions[state.current],
          articles: state.transactions[state.current].articles.map((article) => {
            return (article.id == action.articleId) ? {...article, quantity: action.quantity} : article
          })
        }
      }
    }

  case 'INC_QUANTITY':
    return {
      current: state.current,
      transactions: {
        ...state.transactions,
        [state.current]: {
          ...state.transactions[state.current],
          articles: state.transactions[state.current].articles.map((article) => {
            return (article.id == action.articleId) ? {...article, quantity: parseInt(article.quantity, 10) + 1} : article
          })
        }
      }
    }
  default:
    return state
  }
}

export const getCurrent = (state) => {
  return state.transactions[state.current]
}

export const isBeingProcessed = (state, id) => {
  return typeof state.transactions[id] !== "undefined"
}

export default combineReducers({
  byId,
  allIds,
  transactions,
})

export const getTasks = function(state){
  return state.wip.allIds.map((id) => {
    return state.wip.byId[id]
  });
}

export const getTask = function(state, taskId){
  return state.wip.byId[taskId]
}

export const getArticles = function(state, taskId){
  return state.wip.byId[taskId].articles
}

export const getArticle = function(state, taskId, articleId){
  return state.wip.byId[taskId].articles
    .filter((article) => {
      return article.id == articleId
    })[0]
}

export const hasTaskChanged = function(state, taskId){
  return state.wip.byId[taskId] !== state.current.byId[taskId]
}