// tmp tasks only live for the duration of the app's life
let counter = 0
export const generateTmpId = () => {
  return "tmp_" + (counter++)
}

export const createTask = (taskFields) => {
  const { id, type, title, header = {}, articles = [] } = taskFields
  return { id, type, title, header, articles }
}