import React from 'react'
import QuantityBlock from 'components/QuantityBlock'

import './style.scss'

function ArticleCell(props){

  function onChange(quantity){
    if(props.onChangeValue)
      props.onChangeValue(props.id, quantity)
  }

  function onLeftClick(articleId){
    return function(){
      if(props.onLeftClick)
        props.onLeftClick(articleId)
    }
  }

  return <div className="article-cell">
    <div className="article-cell-left" onClick={onLeftClick(props.id)}>
      <div><span className="article-cell-description">{props.description}</span></div>
      <div><span className="article-cell-composition">{props.composition}</span></div>
    </div>
    <div className="article-cell-right">
      <QuantityBlock onChangeQuantity={onChange} quantity={props.quantity} name="quantity" id="quantity"/>
    </div>
  </div>
}

export default ArticleCell