import React from 'react'

import "scss/custom.scss";

function Error(props){
  return <div><span className='text-danger'>{props.message}</span></div>
}

export default Error