import React from 'react'
import Header from 'components/Header'
import ThemedPage from 'components/pages/ThemedPage'
import ArticleList from 'components/ArticleList'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { getTask, getArticles, hasChanges } from 'reducers'
import { updateQuantity } from 'actions/articles'
import { discardChanges, saveChanges } from 'actions/transaction'
import { openDialogConfirm, closeDialogConfirm } from 'components/dialogs/DialogConfirm'

class OrderArticleList extends React.Component{
  constructor(props){
    super(props)
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleClickLeft = this.handleClickLeft.bind(this)
  }

  handleChangeValue(articleId, quantity){
    this.props.updateQuantity(this.props.taskId, articleId, quantity);
  }

  handleClickLeft(articleId){
    const {history, match} = this.props;
    history.push(match.url + "/" + articleId)
  }

  render(){
    let {history} = this.props;
    let goBack = () => {
      if(!this.props.transactionHasChanges){
        history.goBack();
      } else {
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
    }

    return <ThemedPage>
      <Header title={this.props.task.title} leftIcon={Header.ICONS.BACK} onLeftClick={goBack}/>
      {this.props.articles.length > 0 ?
        <ArticleList articles={this.props.articles} onChangeValue={this.handleChangeValue} onClickLeft={this.handleClickLeft}/>
        : <div>No articles</div>
      }
    </ThemedPage>
  }
}

const mapStateToProps = (state, props) => ({
  task: getTask(state, props.taskId),
  articles: getArticles(state, props.taskId),
  transactionHasChanges: hasChanges(state)
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