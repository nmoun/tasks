import React from 'react'
import Header from 'components/Header'
import ThemedPage from 'components/layout/ThemedPage'
import ArticleList from 'components/ArticleList'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { getTask, getArticles, hasChanges } from 'reducers'
import { updateQuantity, addArticle, deleteArticle, incrementArticle } from 'actions/articles'
import { discardChanges, saveChanges } from 'actions/transaction'
import { openDialogConfirm, closeDialogConfirm } from 'components/dialogs/DialogConfirm'
import { openDialogScan } from 'components/dialogs/DialogScan'
import * as api from 'service/ArticleService'

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
    const goBack = () => {
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

    const openDialog = () => {
      openDialogScan({
        isDismissible: true,
        message: "Scan article code",
        handleSubmit: handleSubmitArticleCode
      })
    }

    const handleSubmitArticleCode = (articleCode) => {
      api.fetchArticle(articleCode)
        .then((res) => {
          console.log('response article: ' + JSON.stringify(res))
          if(res.length > 0){
            let tmp = this.props.articles.filter((article) => (article.id == res[0].id))
            if(tmp.length === 0){
              this.props.addArticle(res[0], this.props.task.id)
            }else{
              this.props.incrementArticle(tmp[0].id, this.props.task.id)
            }
          }
        })
    }

    const handleClickRemoval = (articleId) => {
      this.props.deleteArticle(articleId, this.props.task.id)
    }


    return <ThemedPage fab={true} handleClickFab={() => {openDialog()}}>
      <Header title={this.props.task.title} leftIcon={Header.ICONS.BACK} onLeftClick={goBack}/>
      {this.props.articles.length > 0 ?
        <ArticleList
          articles={this.props.articles}
          onChangeValue={this.handleChangeValue}
          onClickLeft={this.handleClickLeft}
          onClickRemoval={handleClickRemoval}/>
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
  saveChanges,
  addArticle,
  deleteArticle,
  incrementArticle
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderArticleList))