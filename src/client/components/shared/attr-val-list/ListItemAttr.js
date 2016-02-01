import React, { Component, PropTypes } from 'react'

export default class ListItemAttr extends Component {

  static propTypes = {
    attr: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  };

  render() {
    const { attr } = this.props
    return (
      <span className='attr'>
        {attr}
      </span>
    )
  }
}
