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
    switch (action.type) {
    case 'DISCARD':
      // discard changes of current transaction
      let newTransactions = {...transactions}
      delete newTransactions[action.taskId]
      return {
        current: null,
        tasks,
        transactions: newTransactions
      }
    case 'START_TRANSACTION':
      return {
        current: action.id, // id of the object
        tasks,
        transactions: {...transactions, [action.taskId]: tasks[action.taskId]},
      }
    case 'STOP_TRANSACTION':
      // Case when the object is no longer in the current transaction but is still being processed
      return {
        current: null,
        tasks: state.tasks,
        transactions: {...state.transactions}
      }
    default:
      // Delegate handling the action to the passed reducer
      if(action.taskId){
        const newTasks = tasksReducer(state.tasks, action)
        const newTask = taskReducer(state.transactions[action.taskId], action)
        return {
          current,
          tasks: newTasks,
          transactions: {
            ...transactions,
            [action.taskId]: newTask
          }
        }
      }
      return state
    }
  }
}

export default transaction