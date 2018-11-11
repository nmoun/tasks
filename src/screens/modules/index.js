import React from 'react'
import { Route } from 'react-router-dom'

import Order from './Order'
import Reception from './Reception'

export default function Modules({ match }){
  return <div>
    <Route path={`${match.path}/order`} component={Order} />
    <Route path={`${match.path}/reception`} component={Reception} />
  </div>
}