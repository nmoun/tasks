import * as apiOrder from 'service/OrderService'
import { updateTaskStatus, deleteTask } from './tasks'
import { displayNotification } from './ui'
import { saveChanges } from './transaction'
import { TASK_STATUS } from 'utils/constants'

export const validateTask = (task) => {
  return function(dispatch){
    dispatch(updateTaskStatus(task.id, TASK_STATUS.LOADING))
    dispatch(saveChanges())
    apiOrder.validateTask(task)
      .then(() => {
        setTimeout(() => {
          dispatch(deleteTask(task.id))
          dispatch(displayNotification("Order task has been validated"))
        }, 2000);
      })
      .catch((err) => {
        dispatch(displayNotification(err, 'error'))
      })
  }
}