import React from 'react'
import * as fromDialog from 'components/dialogs/Dialog'

import './style.scss'
import Barcode from '../../../assets/barcode.svg'

function DialogScan(props) {

  function handleSubmit(event){
    if(props.handleSubmit){
      props.handleSubmit(event.target[0].value)
    }
    event.preventDefault()
    closeDialogScan()
  }

  return <div>
    <div className="dialog-scan-img-container">
      <img src={Barcode}
        alt="Grapefruit slice atop a pile of other slices" />
    </div>
    <div className="dialog-scan-msg-container">{props.message}</div>
    <div className="dialog-scan-input-container">
      <form onSubmit={handleSubmit}>
        <input type="text" name="code" className="dialog-scan-input"/>
      </form>
    </div>
  </div>
}

export function openDialogScan(props){
  fromDialog.openDialog(DialogScan, props)
}

export function closeDialogScan(){
  fromDialog.closeDialog();
}