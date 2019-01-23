
import * as actions from 'actions/tasks'
import {expect} from 'chai'
import { createStore, applyMiddleware } from 'redux'
import { tasks } from 'reducers/tasks'
import { normalize } from 'normalizr'
import { tasks as tasksSchema } from 'schemas'
import { createLogger } from 'redux-logger'

export function taskTests(){

  describe('tasks', () => {
    let store

    before(function() {
      const logger = createLogger({});
      const middlewares = [logger]
      store = createStore(tasks, applyMiddleware(...middlewares))
    });

    describe('actions', () => {

      it('should add 1 task to the store', () => {
        var response = [{
          "id": "4",
          "title": "Order",
          "type": "order",
          "content": "4",
          "articles": []
        }]

        var normalizedData = normalize(response, tasksSchema)

        store.dispatch(actions.receiveTasks(normalizedData));

        expect(store.getState().allIds).to.be.an('array').that.have.lengthOf(1)
      })
    })
  })

}