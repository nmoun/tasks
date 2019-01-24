import task from './task'
import tasks from './tasks'
import * as fromTasks from './tasks'

/**
 * Keep track of the task being currently modified by the user
 * @param {function} tasksReducer - reducer handling actions affecting the list of tasks
 * @param {function} taskReducer - reducer handling actions affecting one task
 */
function transaction(tasksReducer, taskReducer){
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    current: null,
    tasks: tasksReducer(undefined, {}),
    transactions: {},
  }

  return function(state = initialState, action) {
    let { current, tasks, transactions } = state,
      newTransactions
    switch (action.type) {
    case 'DISCARD':
      // discard changes of current task
      if(!current){
        throw new Error('Outside of a transaction, should not happen')
      }
      newTransactions = {...transactions}
      delete newTransactions[current]
      return {
        current,
        tasks,
        transactions: newTransactions
      }

    case 'SAVE':
      // save changes of current task
      if(!current){
        throw new Error('Outside of a transaction, should not happen')
      }
      newTransactions = {...transactions}
      var task = newTransactions[current];
      delete newTransactions[current]
      return {
        current,
        tasks: {
          byId: {...tasks.byId, [current]: task},
          allIds: tasks.allIds.indexOf(current) === -1 ? tasks.allIds.concat(current) : tasks.allIds
        },
        transactions: newTransactions
      }

    case 'START_TRANSACTION':
      // put given task in list of transactions
      return {
        current: action.taskId,
        tasks,
        transactions: transactions[action.taskId] ? transactions : {...transactions, [action.taskId]: action.task },
      }

    case 'STOP_TRANSACTION':
      // ...
      newTransactions = {...transactions}
      delete newTransactions[current]
      return {
        current: null,
        tasks,
        transactions: newTransactions,
      }
    default:
      newTransactions = {...transactions}
      if(action.type.startsWith('TASK_')){
        newTransactions[action.taskId] = taskReducer(state.transactions[action.taskId], action)
      }
      const newTasks = tasksReducer(state.tasks, action)
      return {
        current,
        tasks: newTasks,
        transactions: newTransactions
      }
    }
  }
}

export default transaction(tasks, task)

export const getTasks = function(state){
  return fromTasks.getTasks(state.tasks)
}

export const getTask = function(state, taskId){
  return fromTasks.getTask(state.tasks, taskId)
}

export const getCurrentTask = function(state){
  return state.transactions[state.current]
}

export const getCurrentTaskArticles = function(state){
  return state.transactions[state.current].articles
}

export const getCurrentTaskArticle = function(state, articleId){
  return state.transactions[state.current].articles
    .filter((article) => {
      return article.id == articleId
    })[0]
}

export const hasTaskChanged = function(state, taskId){
  return state.tasks.byId[taskId] !== state.transactions[taskId]
}