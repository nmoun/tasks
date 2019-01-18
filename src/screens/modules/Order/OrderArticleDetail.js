import React from 'react'
import ArticleCell from 'components/ArticleCell'
import ThemedPage from 'components/layout/ThemedPage'
import Header, { ICONS } from 'components/Header'
import { getArticle } from 'reducers'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateQuantity } from 'actions/articles'


class OrderArticleDetail extends React.Component{

  constructor(props){
    super(props)
    this.handleChangeValue = this.handleChangeValue.bind(this)
  }

  handleChangeValue(articleId, quantity){
    this.props.updateQuantity(this.props.taskId, articleId, quantity);
  }

  render(){
    let {history} = this.props;
    let goBack = () => {
      history.goBack();
    }

    return <ThemedPage>
      <Header title="Article detail" leftIcon={ICONS.LEFT} handleClickLeft={goBack}/>
      <ArticleCell {...this.props.article} handleChangeValue={this.handleChangeValue}/>
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