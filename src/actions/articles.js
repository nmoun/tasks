export function updateQuantity(taskId, articleId, quantity){
  return {
    type: 'UPDATE_QUANTITY',
    taskId,
    articleId,
    quantity,
  }
}

export function addArticle(article, taskId){
  return {
    type: 'ADD_ARTICLE',
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

export function incrementArticle(articleId, taskId){
  return {
    type: 'INC_QUANTITY',
    taskId,
    articleId
  }
}