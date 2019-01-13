import React from 'react'
import ArticleCell from 'components/ArticleCell'
import ThemedPage from 'components/pages/ThemedPage'
import Header from 'components/Header'
import { getArticle } from 'reducers'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateQuantity } from 'actions/articles'


class OrderArticleDetail extends React.Component{

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
      history.goBack();
    }

    return <ThemedPage>
      <Header title="Article detail" leftIcon={Header.ICONS.BACK} onLeftClick={goBack}/>
      <ArticleCell {...this.props.article} onChangeValue={this.onChangeValue}/>
    </ThemedPage>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    article: getArticle(state, ownProps.taskId, ownProps.articleId)
  }
}

const mapDispatchToProps = {
  updateQuantity
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderArticleDetail))