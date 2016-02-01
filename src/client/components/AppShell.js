/**
 * Outside application container, which contains only stuff that all users should be able
 * to see. Once user is logged in, AppContainer is rendered from the children and the
 * user can proceed onwards.
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { errorNotifications } from 'client/utils/throwSyncError'
import { showError } from 'client/actions/appActions'
import Preloader from 'client/components/shared/Preloader'
import SystemError from 'client/components/shared/error-pages/SystemError'

@connect(state => ({
  handleSystemError: state.app.handleSystemError
}))
export default class AppShell extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    handleSystemError: PropTypes.string,
  };

  componentDidMount() {
    errorNotifications(error => {
      this.props.dispatch(showError(error))
    })
  }

  render() {
    const { handleSystemError } = this.props

    const classes = classNames({
      'has-system-error': handleSystemError
    })

    return (
      <div className={classes}>
        { handleSystemError &&
          <SystemError /> }

        {this.props.children}

        <Preloader />
      </div>
    )
  }
}
