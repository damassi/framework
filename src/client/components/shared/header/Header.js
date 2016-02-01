import React, { Component } from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavbarBrand } from 'react-bootstrap'
import CreateButton from 'client/components/shared/header/CreateButton'
import NavItems from 'client/components/shared/header/NavItems'
import { DEFAULT_ROUTE } from 'client/routes'

export default class Header extends Component {

  render() {
    return (
      <header className='header-container'>
        <Navbar inverse fixedTop>

          <NavbarBrand>
            <Link to={DEFAULT_ROUTE} className='navbar-brand'>
              <img src='/assets/images/logo-header.svg' alt='TimeInc logo' />
            </Link>
          </NavbarBrand>

          <NavItems />

          <Nav navbar pullRight>
            <li className='dropdown'>
              <CreateButton />
            </li>
            <li>
              <Link to='/logout'>
                Logout
              </Link>
            </li>
          </Nav>

        </Navbar>
      </header>
    )
  }
}
