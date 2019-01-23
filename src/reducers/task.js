const task = (state = {articles: []}, action) => {
  switch (action.type) {

  case 'UPDATE_TASK':
    return {
      ...state,
      ...action.fields
    }
  case 'ADD_ARTICLE': 
    return {
      ...state,
      articles: state.articles.concat({...action.article, quantity: 1})
    }

  case 'DELETE_ARTICLE': 
    return {
      ...state,
      articles: state.articles.filter((article) => {
        return (article.id !== action.articleId)
      })
    }

  case 'UPDATE_QUANTITY': 
    return {
      ...state,
      articles: state.articles.map((article) => {
        return (article.id == action.articleId) ? {...article, quantity: action.quantity} : article
      })
    }

  case 'INC_QUANTITY':
    return {
      ...state,
      articles: state.articles.map((article) => {
        return (article.id == action.articleId) ? {...article, quantity: parseInt(article.quantity, 10) + 1} : article
      })
    }
  default:
    return state
  }
}

export default task