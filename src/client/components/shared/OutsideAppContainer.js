import React, { Component, PropTypes } from 'react'

export default class InsideApp extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className='outside-app'>
        <div className='outside-app-heading'>
          <a href='/'>
            Project Title Goes Here
          </a>
        </div>
        <div className='outside-app-body'>
          {this.props.children}
        </div>
        <div className='outside-app-footer'>
          Feedback? Let us know on Slack: <a href='https://timeinc.slack.com/messages/dam-feedback/'>#dam-feedback</a>
        </div>
      </div>
    )
  }
}
