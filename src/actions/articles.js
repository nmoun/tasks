export function updateQuantity(taskId, articleId, quantity){
  return {
    type: 'UPDATE_QUANTITY',
    taskId,
    articleId,
    quantity,
  }
}