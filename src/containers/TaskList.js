import {connect} from 'react-redux'
import {getTasks} from 'reducers'
import WidgetList from 'components/WidgetList'

const mapStateToProps = (state) => ({
  tasks: getTasks(state),
})

export default connect(
  mapStateToProps,
)(WidgetList)