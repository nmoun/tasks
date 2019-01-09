import React from 'react'

import './style.scss'

function QuantityBlock(props){
  let textInput = React.createRef();

  function handleClick() {
    textInput.current.focus()
  }

  function handleChange(event){
    props.onChangeQuantity(event.target.value)
  }
  return <div className="quantity-block" onClick={handleClick}>
    <input type="text" value={props.quantity} name="quantity" id="quantity" ref={textInput} onChange={handleChange}/>
  </div>
}


export default QuantityBlock