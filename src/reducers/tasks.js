
import {combineReducers} from 'redux'


const byId =  function(state = {}, action) {
  let newState;
  switch (action.type) {
  case 'RECEIVE_TASKS':
    newState = {...state}
    action.tasks.forEach(task => {
      let {content, ...rest} = task
      newState[task.id] = {...rest}
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

export const getTask = function(state, taskId){
  return state.tasks.allIds.filter((id) => {
    return id === taskId
  }).map((id) => {
    return state.tasks.byId[id]
  })[0];
}

export const getIsFetching = function(state){
  return state.isFetching;
}