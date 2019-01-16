import React from 'react'
import QuantityBlock from 'components/QuantityBlock'

import './style.scss'

class ArticleCell extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleLeftClick = this.handleLeftClick.bind(this)
    this.handleClickRemoval = this.handleClickRemoval.bind(this)
  }

  handleChange(quantity){
    if(this.props.onChangeValue){
      this.props.onChangeValue(this.props.id, quantity)
    }
  }

  handleLeftClick(){
    if(this.props.onClickLeft)
      this.props.onClickLeft(this.props.id)
  }

  handleClickRemoval(){
    if(this.props.onClickRemoval)
      this.props.onClickRemoval(this.props.id)
  }

  render(){
    const classTop = "article-cell-top" + ((this.props.onClickLeft) ? " clickable" : "")

    return <div className="article-cell ">
      <div className={classTop}>
        <div className="article-cell-left" onClick={this.handleLeftClick}>
          <div><span className="article-cell-description">{this.props.description}</span></div>
          <div><span className="article-cell-composition">{this.props.composition}</span></div>
        </div>
        <div className="article-cell-right">
          <QuantityBlock onChangeQuantity={this.handleChange} quantity={this.props.quantity} name="quantity" id="quantity"/>
        </div>
      </div>
      <div className="clickable" onClick={this.handleClickRemoval}>
        <span className="article-cell-bottom-label">Remove this article</span>
      </div>
    </div>
  }
}

export default ArticleCell