import React, { Component } from 'react'
import { Link } from 'react-router'
import AppContainer from 'client/components/AppContainer'
import { DEFAULT_ROUTE } from 'client/routes'

export default class Error404 extends Component {
  render() {
    return (
      <AppContainer>
        <div className='text-center p-a-lg lead'>
          <img src='/assets/images/404-graphic.svg' alt='404 graphic' className='m-b-md'/>
          <p>
            <strong>
              Oops, that’s a 404 error.
            </strong>
            <br />
            We couldn’t seem to find the page you are looking for.
          </p>
          <Link to={DEFAULT_ROUTE} className='btn btn-primary-outline m-t-sm'>
            Go home ›
          </Link>
        </div>
      </AppContainer>

    )
  }
}
