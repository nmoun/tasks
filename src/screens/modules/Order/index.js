import React from 'react'
import { connect } from 'react-redux'
import {Route, withRouter} from 'react-router-dom'
import OrderArticleList from './OrderArticleList'
import OrderArticleDetail from './OrderArticleDetail'
import { createTask } from 'actions/tasks'

function Order(props){
  if(props.match.path === props.location.pathname){
    // Root route
    const { history } = props
    props.createTask({id: 'tmp', type: 'order', title: 'Order'})
    history.replace(`${props.match.path}/tmp`)
  }


  return <React.Fragment>
    <Route path={`${props.match.path}/:taskId`} exact render={(props) => { return <OrderArticleList taskId={props.match.params.taskId} {...props}/> }} />
    <Route path={`${props.match.path}/:taskId/:articleId`} exact render={(props) => { return <OrderArticleDetail taskId={props.match.params.taskId} articleId={props.match.params.articleId} {...props}/> }} />
  </React.Fragment>
}

const mapDispatchToProps = {
  createTask
}

export default withRouter(connect(null, mapDispatchToProps)(Order))