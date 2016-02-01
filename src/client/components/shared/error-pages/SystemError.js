import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { DEFAULT_ROUTE } from 'client/routes'

@connect(state => ({
  errorMessage: get(state.app, 'error.message', ''),
  stack: get(state.app, 'error.stack', '')
}))
export default class SystemError extends Component {

  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    stack: PropTypes.string.isRequired
  };

  render() {
    const { errorMessage, stack } = this.props

    return (
      <div className='system-error'>
        <div className='container'>
          <div className='row'>

            <div className='col-sm-12 p-a m-b m-t'>
              <img src='/assets/images/system-error-graphic.svg' alt='System error graphic' className='m-b-md'/>
              <h3 className='m-a-0'>
                Oops, that’s an error.
              </h3>
              <p className='lead m-b-sm'>
                The system appears to have encountered an error.
              </p>

              <p>
                <a href={DEFAULT_ROUTE} className='btn btn-primary m-r-xsm'>
                  Reload Page
                </a>
                <a href='https://timeinc.slack.com/messages/dam-feedback/' className='btn btn-default'>
                  Get Help on Slack: #dam-feedback
                </a>
              </p>
            </div>

            <div className='col-sm-8 col-sm-offset-2'>
              { errorMessage &&
                <div className='alert alert-danger'>
                  <h4 className='m-b-xsm'>
                    Error Message:
                  </h4>
                  <p>
                    {errorMessage}
                  </p>
                </div> }

              { stack &&
                <div className='m-t alert alert-warning'>
                  <h4 className='m-b-xsm'>
                    Stack Trace:
                  </h4>

                  <p style={{ fontFamily: 'monospace' }}>
                    {stack}
                  </p>
                </div> }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
