import React from 'react'
import Header from 'components/Header'
import ThemedPage from 'components/pages/ThemedPage'
import ArticleList from 'components/ArticleList'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { getTask, getArticles } from 'reducers'
import {updateQuantity} from 'actions/articles'
import { discardChanges, saveChanges } from 'actions/transaction'
import { openDialogConfirm, closeDialogConfirm } from 'components/dialogs/DialogConfirm'

class OrderArticleList extends React.Component{
  constructor(props){
    super(props)
    this.onChangeValue = this.onChangeValue.bind(this)
  }

  onChangeValue(articleId, quantity){
    this.props.updateQuantity(this.props.taskId, articleId, quantity);
  }

  render(){
    let {history} = this.props;
    let goBack = () => {
      openDialogConfirm({
        isDismissible: true,
        message: "Save changes?", 
        handleYes: () => {
          this.props.saveChanges()
          closeDialogConfirm();
          history.goBack();
        }, 
        handleNo: () => {
          this.props.discardChanges()
          closeDialogConfirm();
          history.goBack();
        }
      })
    }

    return <ThemedPage>
      <Header title={this.props.task.title} leftIcon={Header.ICONS.BACK} onLeftClick={goBack}/>
      {this.props.articles.length > 0 ?
        <ArticleList articles={this.props.articles} onChangeValue={this.onChangeValue}/> : <div>No articles</div>
      }
    </ThemedPage>
  }
}

const mapStateToProps = (state, props) => ({
  task: getTask(state, props.taskId),
  articles: getArticles(state, props.taskId)
})

const mapDispatchToProps = {
  updateQuantity,
  discardChanges,
  saveChanges
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderArticleList))