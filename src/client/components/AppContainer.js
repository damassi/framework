/**
 * Internal container, after user has successfully logged into application.
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from 'client/components/shared/header/Header'
import Footer from 'client/components/shared/Footer'

@connect(state => ({
  loggedIn: state.session.loggedIn,
  displayName: state.session.displayName,
  email: state.session.email
}))
export default class AppContainer extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    displayName: PropTypes.string,
    email: PropTypes.string
  };

  render() {
    const { children, loggedIn } = this.props

    return (
      loggedIn &&

      <div className='app-container'>
        <Header />
        <main className='main-container container'>
          <div className='row'>
            {children}
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}
