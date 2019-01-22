export function discardChanges(){
  return {
    type: 'DISCARD'
  }
}

export function saveChanges(){
  return {
    type: 'SAVE'
  }
}

export function startTransaction(taskId){
  return {
    type: 'START_TRANSACTION',
    taskId,
  }
}

export function stopTransaction(){
  return {
    type: 'STOP_TRANSACTION'
  }
}