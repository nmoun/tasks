import React from 'react'
import Header from 'components/Header'
import ThemedPage from 'components/pages/ThemedProtectedPage'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { getTask } from 'reducers'

class Order extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    let {history} = this.props;
    let goBack = () => {
      history.goBack();
    }
    return <ThemedPage>
      <Header title={this.props.task.title} leftIcon={Header.ICONS.BACK} onLeftClick={goBack}/>
    </ThemedPage>
  }
}

const mapStateToProps = (state, props) => ({
  task: getTask(state, props.match.params.id),
})

export default withRouter(connect(
  mapStateToProps,
)(Order))