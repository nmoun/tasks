import { createStore, applyMiddleware } from 'redux'
import reducer from 'reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import debounce from 'lodash.debounce'
import {STATE} from 'utils/constants'


export const configureStore = () => {
  const logger = createLogger({});
  const middlewares = [thunk, logger]
  const persistedState = localStorage.getItem(STATE) ? JSON.parse(localStorage.getItem(STATE)) : {}
  let store = createStore(reducer, persistedState, applyMiddleware(...middlewares))

  store.subscribe(debounce(() => {
    localStorage.setItem(STATE, JSON.stringify(store.getState()))
  }, 1000))

  return store
} 