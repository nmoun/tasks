import React from 'react'
import Header from 'components/Header'
import ThemedPage from 'components/pages/ThemedPage'
import ArticleList from 'components/ArticleList'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { getTask } from 'reducers'

class OrderArticleList extends React.Component{
  constructor(props){
    super(props)
    console.log('OrderArticleList: ' + JSON.stringify(props.match))
  }

  render(){
    let {history} = this.props;
    let goBack = () => {
      history.goBack();
    }
    return <ThemedPage>
      <Header title={this.props.task.title} leftIcon={Header.ICONS.BACK} onLeftClick={goBack}/>
      {this.props.task.content && this.props.task.content.articles ?
        <ArticleList articles={this.props.task.content.articles} /> : <div>No articles</div>
      }
    </ThemedPage>
  }
}

const mapStateToProps = (state, props) => ({
  task: getTask(state, props.match.params.id),
})

export default withRouter(connect(
  mapStateToProps,
)(OrderArticleList))