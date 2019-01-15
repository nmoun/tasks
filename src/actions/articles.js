export function updateQuantity(taskId, articleId, quantity){
  return {
    type: 'UPDATE_QUANTITY',
    taskId,
    articleId,
    quantity,
  }
}

export function receiveArticle(article, taskId){
  return {
    type: 'RECEIVE_ARTICLE',
    taskId,
    article
  }
}

export function deleteArticle(articleId, taskId){
  return {
    type: 'DELETE_ARTICLE',
    taskId,
    articleId
  }
}