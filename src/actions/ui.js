export const startFetchingTasks = () => {
  return {
    type: "START_FETCHING_TASKS"
  }
}

export const stopFetchingTasks = () => {
  return {
    type: "STOP_FETCHING_TASKS"
  }
}

const showNotification = (message, status) => {
  return {
    type: "DISPLAY_NOTIFICATION",
    message,
    status
  }
}

export const hideNotification = () => {
  return {
    type: "HIDE_NOTIFICATION",
  }
}

export const displayNotification = (message, status, time = 3000) => {
  return (dispatch) => {
    dispatch(showNotification(message, status));
    setTimeout(() => {
      dispatch(hideNotification())
    }, time)
  }
}