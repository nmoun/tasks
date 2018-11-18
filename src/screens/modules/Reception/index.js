import React from 'react'
import Header from 'components/Header'
import {getTask} from 'reducers'
import ThemedProtectedPage from 'components/pages/ThemedProtectedPage'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

function Reception(props){
  let {history, task} = props;
  let goBack = () => {
    history.goBack();
  }
  console.log(JSON.stringify(props))
  return <ThemedProtectedPage>
    <Header title="Reception" leftIcon={Header.ICONS.BACK} onLeftClick={goBack}/>
    <span className="text-white p-1">Supplier: {task.header ? task.header.supplier : ""}</span>
    <span className="text-white p-1">Articles</span>
  </ThemedProtectedPage>
}

Reception = withRouter(Reception)

const mapStateToProps = (state, ownProps) => ({
  task: getTask(state, ownProps.match.params.id),
})

export default withRouter(connect(
  mapStateToProps
)(Reception))
