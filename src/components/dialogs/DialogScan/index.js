import React from 'react'
import * as fromDialog from 'components/dialogs/Dialog'
import Autocomplete from 'components/Autocomplete'
import './style.scss'
import Barcode from '../../../assets/barcode.svg'

class DialogScan extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event){
    if(this.props.handleSubmit){
      this.props.handleSubmit(this.state.value)
    }
    event.preventDefault()
    closeDialogScan()
  }

  handleChange(e){
    this.setState({
      value: e.target.value
    })
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
          <Autocomplete ref={(input) => { this.codeInput = input; }} handleChange={this.handleChange} value={this.state.value}/>
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