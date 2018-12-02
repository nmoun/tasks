import React from 'react'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'
// import Order from './Order'
import Reception from './Reception'

const Order = Loadable({
  loader: () => import('./Order'),
  loading: function(){ return <div>Loading module...</div>},
});

/**
 * Contains routes to all the business modules
 * @param {Object} param0 
 */
export default function Modules({ match }){
  return <div>
    <Route path={`${match.path}/order`} component={Order} />
    <Route path={`${match.path}/reception/:id`} component={Reception} />
  </div>
}