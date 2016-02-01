import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import cookie from 'react-cookie'
import * as sessionActions from 'client/actions/sessionActions'
import OutsideAppContainer from 'client/components/shared/OutsideAppContainer'
import { persistentCacheOptions as cache } from 'shared/configuration'


@connect(state => ({
  loggedIn: state.session.loggedIn,
  errorStatusText: state.session.errorStatusText
}))
export default class Login extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    errorStatusText: PropTypes.string,
  };


  componentDidMount() {

    // Ensure that cookie is removed when landing on home. Also removed when `logout`
    // action is dispatched.

    cookie.remove(cache.sessionCookie.name)
  }

  handleEnterKey(event) {
    if (event.keyCode === 13) {
      event.preventDefault()

      this.login()
    }
  }

  handleLoginClick(event) {
    event.preventDefault()
    this.login()
  }

  login() {
    const {
      username: { value: username },
      password: { value: password }
    } = this.refs

    this.props.dispatch(sessionActions.login(username, password))
  }

  render() {
    const { errorStatusText } = this.props

    return (
      <OutsideAppContainer>
        <div>
          { errorStatusText &&
            <p className='m-b text-danger text-center'>
              Error logging in: {errorStatusText}
            </p> }
          <form onKeyDown={this.handleEnterKey.bind(this)}>
            <div className='form-group'>
              <label className='sr-only' htmlFor='username'>
                Username
              </label>
              <input ref='username' type='text' placeholder='Username' className='form-control' />
            </div>
            <div className='form-group'>
              <label className='sr-only' htmlFor='username'>
                Username
              </label>
              <input ref='password' type='password' placeholder='Password' className='form-control' />
            </div>
            <button onClick={this.handleLoginClick.bind(this)} className='btn btn-primary btn-block'>
              Log in
            </button>
          </form>
        </div>
      </OutsideAppContainer>
    )
  }
}
