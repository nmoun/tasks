import React from 'react'
import ArticleCell from 'components/ArticleCell'
import ThemedPage from 'components/layout/ThemedPage'
import Header, { ICONS } from 'components/Header'
import { getCurrentTaskArticle } from 'state/reducers'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateQuantity } from 'state/actions/task'
import Footer from 'components/Footer'
import NavButton from 'components/buttons/NavButton'
import cacheImages from 'utils/cacheImages'

class OrderArticleDetail extends React.Component{

  constructor(props){
    super(props)
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  handleChangeValue(articleId, quantity){
    this.props.updateQuantity(this.props.taskId, articleId, quantity);
  }

  goBack(){
    this.props.history.goBack();
  }

  render(){
    return <ThemedPage>
      <Header title="Article detail" leftIcon={ICONS.LEFT} handleClickLeft={this.goBack}/>
      <ArticleCell {...this.props.article} handleChangeValue={this.handleChangeValue}/>
      <Footer>
        <NavButton text="Next" imgSrc={cacheImages["./upArrow.svg"]}/><NavButton text="Prev" imgSrc={cacheImages["./downArrow.svg"]}/>
      </Footer>
    </ThemedPage>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    article: getCurrentTaskArticle(state, ownProps.articleId)
  }
}

const mapDispatchToProps = {
  updateQuantity
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderArticleDetail))