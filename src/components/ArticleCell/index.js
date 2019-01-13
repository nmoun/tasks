import React from 'react'
import QuantityBlock from 'components/QuantityBlock'

import './style.scss'

function ArticleCell(props){

  function handleChange(quantity){
    if(props.onChangeValue){
      props.onChangeValue(props.id, quantity)
    }
  }

  function handleLeftClick(){
    if(props.onClickLeft)
      props.onClickLeft(props.id)
  }

  return <div className="article-cell">
    <div className="article-cell-left" onClick={handleLeftClick}>
      <div><span className="article-cell-description">{props.description}</span></div>
      <div><span className="article-cell-composition">{props.composition}</span></div>
    </div>
    <div className="article-cell-right">
      <QuantityBlock onChangeQuantity={handleChange} quantity={props.quantity} name="quantity" id="quantity"/>
    </div>
  </div>
}

export default ArticleCell