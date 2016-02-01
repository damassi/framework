import React, { Component, PropTypes } from 'react'
import * as multiPanelActions from 'client/widgets/multi-panel/multiPanelActions'

export default class PanelHead extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    panelDispatch: PropTypes.func.isRequired,
    showRemove: PropTypes.bool.isRequired,
    showReset: PropTypes.bool.isRequired
  };

  handleRemoveClick(event) {
    event.preventDefault()

    const {
      id,
      panelDispatch
    } = this.props

    panelDispatch(multiPanelActions.remove(id))
  }

  handleDuplicateClick(event) {
    event.preventDefault()

    const {
      id,
      panelDispatch
    } = this.props

    panelDispatch(multiPanelActions.duplicate(id))
  }

  render() {
    const { index, label, showRemove, showReset } = this.props

    return (
      <div className='form-well-header'>
        <h5 className='pull-left'>
          {label} #{index}
        </h5>

        { (showRemove || showReset) &&
          <button onClick={this.handleRemoveClick.bind(this)} className='btn btn-link pull-right'>
            <span className='icon icon-circle-with-cross'></span>
            &nbsp;Remove
          </button> }

        <button onClick={this.handleDuplicateClick.bind(this)} className='btn btn-link pull-right'>
          <span className='icon icon-documents'></span>
          &nbsp;Duplicate
        </button>
      </div>
    )
  }
}
