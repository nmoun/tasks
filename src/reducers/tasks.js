import {combineReducers} from 'redux'

const byId =  function(state = {}, action) {
  var newState
  switch (action.type) {
  case 'RECEIVE_TASKS':
    // server response with all the tasks
    return action.response.entities.tasks

  case 'RECEIVE_TASK':
    // server response with one task updated/created
    newState = {
      ...state,
      ...action.response.entities.tasks
    }
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

  case 'RECEIVE_TASK':
    return state.concat(action.response.result)

  case 'CREATE_TASK':
    // task creation from client
    return state.concat(action.task.id)

  case 'DELETE_TASK':
    return state.filter((id) => (id != action.taskId))
    
  default:
    return state;
  }
}

export default combineReducers({
  byId,
  allIds,
})

export const getTasks = function(state){
  return state.allIds.map((id) => {
    return state.byId[id]
  });
}

export const getTask = function(state, taskId){
  return state.byId[taskId]
}

export const getArticles = function(state, taskId){
  return state.byId[taskId].articles
}

export const getArticle = function(state, taskId, articleId){
  return state.byId[taskId].articles
    .filter((article) => {
      return article.id == articleId
    })[0]
}