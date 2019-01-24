import * as apiOrder from 'service/OrderService'
import { deleteTask } from './tasks'
import { updateTask } from './task'
import { displayNotification } from './ui'
import { saveChanges } from './transaction'
import { TASK_STATUS } from 'utils/constants'

export const validateTask = (task) => {
  return function(dispatch){
    dispatch(updateTask(task.id, {status: TASK_STATUS.LOADING}))
    dispatch(saveChanges())
    apiOrder.validateTask(task)
      .then(() => {
        setTimeout(() => {
          dispatch(deleteTask(task.id))
          dispatch(displayNotification("Order task has been validated"))
        }, 2000);
      })
      .catch((err) => {
        dispatch(updateTask(task.id, {status: null}))
        dispatch(displayNotification(err, 'error'))
      })
  }
}