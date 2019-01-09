import React from 'react'
import Header from 'components/Header'
import {getTask} from 'reducers'
import ThemedPage from 'components/pages/ThemedPage'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

function Reception(props){
  let {history, task} = props;
  let goBack = () => {
    history.goBack();
  }
  return <ThemedPage>
    <Header title="Reception" leftIcon={Header.ICONS.BACK} onLeftClick={goBack}/>
    <span className="text-white p-1">Supplier: {task.header ? task.header.supplier : ""}</span>
    <span className="text-white p-1">Articles</span>
  </ThemedPage>
}

Reception = withRouter(Reception)

const mapStateToProps = (state, ownProps) => ({
  task: getTask(state, ownProps.match.params.id),
})

export default withRouter(connect(
  mapStateToProps
)(Reception))
