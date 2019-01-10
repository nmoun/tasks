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

export function startTransaction(){
  return {
    type: 'START_TRANSACTION'
  }
}

export function stopTransaction(){
  return {
    type: 'STOP_TRANSACTION'
  }
}