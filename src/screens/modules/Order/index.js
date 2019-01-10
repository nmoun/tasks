import React from 'react'
import {Route, withRouter} from 'react-router-dom'
import OrderArticleList from './OrderArticleList';

function Order(props){
  let taskId = props.match.params.id
  return <React.Fragment>
    <Route path={`${props.match.path}/`} exact render={(props) => { return <OrderArticleList taskId={taskId} {...props}/> }} />
  </React.Fragment>
}

export default withRouter(Order)