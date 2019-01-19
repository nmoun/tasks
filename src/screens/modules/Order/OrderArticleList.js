import React from 'react'
import Header, { ICONS } from 'components/Header'
import ThemedPage from 'components/layout/ThemedPage'
import ArticleList from 'components/ArticleList'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { getTask, getArticles, hasTaskChanged } from 'reducers'
import { updateQuantity, addArticle, deleteArticle, incrementArticle } from 'actions/articles'
import { updateTask } from 'actions/tasks'
import { discardChanges, saveChanges } from 'actions/transaction'
import { openDialogConfirm, closeDialogConfirm } from 'components/dialogs/DialogConfirm'
import { openDialogScan } from 'components/dialogs/DialogScan'
import * as api from 'service/ArticleService'

class OrderArticleList extends React.Component{
  constructor(props){
    super(props)
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleClickLeft = this.handleClickLeft.bind(this)
    this.handleSubmitArticleCode = this.handleSubmitArticleCode.bind(this)
    this.handleClickRemoval = this.handleClickRemoval.bind(this)
    this.openDialogScan = this.openDialogScan.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  handleChangeValue(articleId, quantity){
    this.props.updateQuantity(this.props.taskId, articleId, quantity);
  }

  handleClickLeft(articleId){
    const {history, match} = this.props;
    history.push(match.url + "/" + articleId)
  }

  handleSubmitArticleCode(articleCode){
    api.fetchArticle(articleCode)
      .then((res) => {
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

  handleClickRemoval(articleId){
    this.props.deleteArticle(articleId, this.props.task.id)
  }

  openDialogScan() {
    openDialogScan({
      isDismissible: true,
      message: "Scan article code",
      handleSubmit: this.handleSubmitArticleCode
    })
  }

  componentDidMount(){
    // Display the popup to scan an article if there are no articles
    if(this.props.articles.length === 0)
      this.openDialogScan()
  }

  /**
   * Go back to the task list
   */
  goBack(){
    const { history } = this.props
    if(!this.props.hasTaskChanged){
      history.goBack();
    } else {
      openDialogConfirm({
        isDismissible: true,
        message: "Save changes?", 
        handleYes: () => {
          this.props.saveChanges()
          this.props.updateTask(this.props.task)
          closeDialogConfirm()
          history.goBack()
        }, 
        handleNo: () => {
          this.props.discardChanges()
          closeDialogConfirm();
          history.goBack();
        }
      })
    }
  }

  render(){
    return <ThemedPage fab={true} handleClickFab={this.openDialogScan}>
      <Header title={this.props.task.title} leftIcon={ICONS.LEFT} handleClickLeft={this.goBack}/>
      {this.props.articles.length > 0 ?
        <ArticleList
          articles={this.props.articles}
          handleChangeValue={this.handleChangeValue}
          handleClickLeft={this.handleClickLeft}
          handleClickRemoval={this.handleClickRemoval}/>
        : <div>No articles</div>
      }
    </ThemedPage>
  }
}

const mapStateToProps = (state, props) => ({
  task: getTask(state, props.taskId),
  articles: getArticles(state, props.taskId),
  hasTaskChanged: hasTaskChanged(state, props.taskId)
})

const mapDispatchToProps = {
  updateQuantity,
  discardChanges,
  saveChanges,
  addArticle,
  deleteArticle,
  incrementArticle,
  updateTask,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderArticleList))