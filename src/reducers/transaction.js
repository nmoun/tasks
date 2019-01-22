function transaction(tasksReducer, taskReducer){
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    current: null,
    tasks: tasksReducer(undefined, {}),
    transactions: {},
  }

  // Return a reducer that handles undo and redo
  return function(state = initialState, action) {
    let { current, tasks, transactions } = state
    var newTransactions
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
          allIds: tasks.allIds
        },
        transactions: newTransactions
      }
    case 'START_TRANSACTION':
      // put given task in list of transactions
      return {
        current: action.taskId,
        tasks,
        transactions: transactions[action.taskId] ? transactions : {...transactions, [action.taskId]: tasks.byId[action.taskId]},
      }
    case 'STOP_TRANSACTION':
      // ...
      return {
        current: null,
        tasks,
        transactions,
      }
    default:
      // Delegate handling the action to the passed reducer
      let newTransactions = {...transactions}
      if(action.taskId){
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

export default transaction