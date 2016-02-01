import React, { Component, PropTypes } from 'react'
import * as multiPanelActions from 'client/widgets/multi-panel/multiPanelActions'

export default class AddButton extends Component {

  static propTypes = {
    panelDispatch: PropTypes.func.isRequired,
    formFields: PropTypes.any.isRequired
  };

  handleAddClick(event) {
    event.preventDefault()

    const {
      formFields,
      panelDispatch
    } = this.props

    panelDispatch(multiPanelActions.add(formFields))
  }

  render() {
    return (
      <button onClick={this.handleAddClick.bind(this)} className='btn btn-default'>
        Add &nbsp;
        <span className='icon icon-plus'></span>
      </button>
    )
  }
}
