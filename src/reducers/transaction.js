function transaction(reducer){
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    current: reducer(undefined, {}),
    wip: reducer(undefined, {}),
    runningTransaction: false,
  }

  // Return a reducer that handles undo and redo
  return function(state = initialState, action) {
    const { current, wip, runningTransaction } = state

    switch (action.type) {
    case 'DISCARD':
      // discard changes
      return {
        current,
        wip: current,
        runningTransaction
      }
    case 'SAVE':
      // save changes
      return {
        current: wip,
        wip,
        runningTransaction
      }
    case 'START_TRANSACTION':
      return {
        current,
        wip,
        runningTransaction: true
      }
    case 'STOP_TRANSACTION':
      return {
        current,
        wip,
        runningTransaction: false
      }
    default:
      // Delegate handling the action to the passed reducer
      const newWip = reducer(wip, action)
      if (wip === newWip) {
        return state
      }
      return {
        current: (runningTransaction) ? current : newWip,
        wip: newWip,
        runningTransaction
      }
    }
  }
}

export default transaction