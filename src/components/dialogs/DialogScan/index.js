import React from 'react'
import * as fromDialog from 'components/dialogs/Dialog'
import Autocomplete from 'components/Autocomplete'
import './style.scss'
import Barcode from '../../../assets/barcode.svg'
import throttle from 'lodash.throttle'


class DialogScan extends React.Component {
  /**
   * 
   * @param {Object} props 
   * @param {Object} props.callWebServiceSuggest - must return a promise giving server's response in parameter
   */
  constructor(props){
    super(props)
    this.state = {
      value: "",
      options: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.throttledCallWebService = throttle(() => {
      props.callWebServiceSuggest(this.state.value)
        .then((response) => {
          this.setState({
            options: response
          })
        })
        .catch((err) => {
          this.setState({
            options: []
          })
        })
    }, 1000);
  }

  handleSubmit(event){
    if(this.props.handleSubmit){
      this.props.handleSubmit(this.state.value)
    }
    this.throttledCallWebService.cancel()
    event.preventDefault()
    closeDialogScan()
  }

  handleChange(e){
    const value = e.target.value
    this.setState({
      value
    }, () => {
      if(value.length >= 2 && this.props.callWebServiceSuggest){
        this.throttledCallWebService()
      }else{
        this.setState({
          options: []
        })
      }
    })
  }

  handleClick(optionId){
    if(this.props.handleSubmit){
      this.props.handleSubmit(optionId)
    }
    closeDialogScan()
  }

  componentDidMount(){
    this.codeInput.focus()
  }

  render(){
    return <div>
      <div className="dialog-scan-img-container">
        <img src={Barcode}
          alt="Barcode" />
      </div>
      <div className="dialog-scan-msg-container">{this.props.message}</div>
      <div className="dialog-scan-input-container">
        <form onSubmit={this.handleSubmit}>
          <Autocomplete
            ref={(input) => { this.codeInput = input; }}
            handleChange={this.handleChange}
            handleClick={this.handleClick}
            value={this.state.value}
            options={this.state.options}/>
        </form>
      </div>
    </div>
  }
}

export function openDialogScan(props){
  fromDialog.openDialog(DialogScan, {...props, showOverflow: true})
}

export function closeDialogScan(){
  fromDialog.closeDialog();
}