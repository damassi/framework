import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as sessionActions from 'client/actions/sessionActions'
import OutsideAppContainer from 'client/components/shared/OutsideAppContainer'

@connect(state => ({
  loggedIn: state.session.loggedIn
}))
export default class Logout extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.dispatch(sessionActions.logout())
  }

  render() {
    return (
      <OutsideAppContainer>
        <div className='text-center'>
          <p>
            <strong>
              Logout successful.
            </strong><br />

            Thank you for using the Assignment Desk application.

            <a href='/login' className='btn btn-primary btn-block m-t'>
              Log back in ›
            </a>
          </p>
        </div>
      </OutsideAppContainer>
    )
  }
}
