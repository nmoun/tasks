import React from 'react'
import {Route, withRouter} from 'react-router-dom'
import OrderArticleList from './OrderArticleList'
import OrderArticleDetail from './OrderArticleDetail'

function Order(props){
  let taskId = props.match.params.id
  return <React.Fragment>
    <Route path={`${props.match.path}`} exact render={(props) => { return <OrderArticleList taskId={taskId} {...props}/> }} />
    <Route path={`${props.match.path}/:articleId`} exact render={(props) => { return <OrderArticleDetail taskId={taskId} articleId={props.match.params.articleId} {...props}/> }} />
  </React.Fragment>
}

export default withRouter(Order)