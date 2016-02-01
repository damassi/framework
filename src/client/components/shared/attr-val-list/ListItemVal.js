import React, { Component, PropTypes } from 'react'

export default class ListItemVal extends Component {

  static propTypes = {
    val: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number, PropTypes.element])
  };

  render() {
    const { val } = this.props
    return (
      <span className='val'>
        {val}
      </span>
    )
  }
}
