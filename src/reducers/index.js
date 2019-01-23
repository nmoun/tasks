import { combineReducers } from 'redux'
import transaction from './transaction'
import ui from './ui'
import * as fromTransaction from './transaction'
import * as fromUI from './ui'

export default combineReducers({
  transaction,
  ui
})

export const getCurrentTask = function(state){
  return fromTransaction.getCurrentTask(state.transaction)
}

export const getCurrentTaskArticles = function(state){
  return fromTransaction.getCurrentTaskArticles(state.transaction)
}

export const getTasks = function(state){
  return fromTransaction.getTasks(state.transaction)
}

export const hasTaskChanged = function(state, taskId){
  return fromTransaction.hasTaskChanged(state.transaction, taskId)
}

export const getIsFetching = function(state){
  return fromUI.getIsFetching(state.ui)
}

export const getNotification = function(state){
  return fromUI.getNotification(state.ui)
}