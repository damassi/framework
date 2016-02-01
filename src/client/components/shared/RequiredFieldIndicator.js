import React, { Component, PropTypes } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export default class RequiredFieldIndicator extends Component {

  static propTypes = {
    errorMsg: PropTypes.string
  };

  static defaultProps = {
    errorMsg: 'Required.'
  };

  render() {
    const { errorMsg } = this.props

    return (
      <OverlayTrigger
        overlay={
          <Tooltip id='tooltip-required-field'>
            {errorMsg}
          </Tooltip> }
        placement='top'
        delayShow={300}
        delayHide={150}>
          <sup className='field-indicator'>
            *
          </sup>
      </OverlayTrigger>
    )
  }
}
