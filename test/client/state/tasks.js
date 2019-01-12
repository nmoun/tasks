
import * as actions from 'actions/tasks'
import {expect} from 'chai'
import { createStore} from 'redux'
import tasks, * as selectors from 'reducers/tasks'

export function taskTests(){

  describe('tasks', () => {
    let store

    before(function() {
      store = createStore(tasks)
    });

    describe('actions', () => {
      it('should return the same object', () => {

        var tasks = [{
          "id": "4",
          "title": "Order",
          "type": "order",
          "content": "4"
        }]
        
        expect(actions.receiveTasks(tasks).tasks).to.equal(tasks)
      })

      it('should add 1 task to the store', () => {
        var tasks = [{
          "id": "4",
          "title": "Order",
          "type": "order",
          "content": "4"
        }]

        store.dispatch(actions.receiveTasks(tasks));

        expect(store.getState().tasks.allIds).to.be.an('array').that.have.lengthOf(1)
      })
    })

    describe('selectors', () => {

      it('should return one task', () => {
        expect(selectors.getTask(store.getState(), "4")).to.be.an('object')
      })

      it('should return an array containing one task', () => {
        expect(selectors.getTasks(store.getState())).to.be.an('array').to.have.lengthOf(1)
      })
    })
  })

}