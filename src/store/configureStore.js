import { createStore, applyMiddleware } from 'redux'
import reducer from 'reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'


export const configureStore = () => {
  const middlewares = [thunk]

  const logger = createLogger({});
  middlewares.push(logger)
  let store = createStore(reducer, applyMiddleware(...middlewares))
  return store
} 