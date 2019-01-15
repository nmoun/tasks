import React from 'react'
import ArticleCell from 'components/ArticleCell'

import './style.scss'

function ArticleList(props){
  let args = {}

  if(props.onChangeValue){
    args.onChangeValue = props.onChangeValue
  }

  if(props.onClickLeft){
    args.onClickLeft = props.onClickLeft
  }

  if(props.onClickRemoval){
    args.onClickRemoval = props.onClickRemoval
  }

  return <ul className="article-list">
    {props.articles.map((article) => {
      let articleProps = {...article}
      return <li key={article.id}><ArticleCell {...articleProps} {...args}/></li>
    })}
  </ul>
}


export default ArticleList