import React, { Component } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export default class EmailIndicator extends Component {
  render() {
    return (
      <OverlayTrigger
        overlay={
          <Tooltip id='tooltip-in-photographer-email'>
            Included in email to photographer.
          </Tooltip> }
        placement='top'
        delayShow={300}
        delayHide={150}>
          <sup className='field-indicator field-indicator-photographer-email'>
            †
          </sup>
        </OverlayTrigger>
    )
  }
}
