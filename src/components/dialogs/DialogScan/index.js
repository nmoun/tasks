import React from 'react'
import * as fromDialog from 'components/dialogs/Dialog'

import './style.scss'
import Barcode from '../../../assets/barcode.svg'

class DialogScan extends React.Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event){
    if(this.props.handleSubmit){
      this.props.handleSubmit(event.target[0].value)
    }
    event.preventDefault()
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
          <input ref={(input) => { this.codeInput = input; }} type="text" name="code" className="dialog-scan-input"/>
        </form>
      </div>
    </div>
  }
}

export function openDialogScan(props){
  fromDialog.openDialog(DialogScan, props)
}

export function closeDialogScan(){
  fromDialog.closeDialog();
}