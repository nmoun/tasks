
// tmp tasks only live for the duration of the app's life
let counter = 0
export const generateTmpId = () => {
  return "tmp_" + (counter++)
}