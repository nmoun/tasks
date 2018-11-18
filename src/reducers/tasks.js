
import {combineReducers} from 'redux'


const byId =  function(state = {}, action) {
  switch (action.type) {
  case 'RECEIVE_TASKS':
    let newState = {...state}
    action.tasks.forEach(el => {
      newState[el.id] = {
        id: el.id,
        title: el.title,
        type: el.type,
        header: el.header,
        content: el.content
      }
    });
    return newState
  default:
    return state
  }
};

const allIds = (state = [], action) => {
  switch(action.type){
  case 'RECEIVE_TASKS':
    return action.tasks.map((task) => {
      return task.id
    })
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

export const getTask = function(state, fetchedTaskId){
  return state.tasks.allIds.map((id) => {
    if(id === fetchedTaskId)
      return state.tasks.byId[id]
  });
}

export const getIsFetching = function(state){
  return state.isFetching;
}