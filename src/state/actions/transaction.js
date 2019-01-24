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

export function startTransaction(taskId, task){
  return {
    type: 'START_TRANSACTION',
    taskId,
    task,
  }
}

export function stopTransaction(){
  return {
    type: 'STOP_TRANSACTION'
  }
}