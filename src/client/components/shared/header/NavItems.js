import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { compact } from 'lodash'
import { capitalize } from 'lodash'
import classNames from 'classnames'
import { resources } from 'shared/configuration'

const NavItems = ({ currentRoute }) =>
  <ul className='nav navbar-nav nav-items'>
    { buildNavItems(currentRoute).map((navItem, index) => {
      const {
        classes,
        label,
        resourceKey,
      } = navItem

      return (
        <li className={classes} key={`nav-${index}`}>
          <Link to={resourceKey}>
            {label}
          </Link>
        </li>
      )
    })}
  </ul>

function buildNavItems(currentRoute) {
  const navItems = resources.map(({ initialState }) => {
    const {
      resourceKey
    } = initialState

    return {
      classes: classNames({
        active: currentRoute
          .replace('/', '')
          .includes(resourceKey),
      }),
      label: capitalize(resourceKey),
      resourceKey: '/' + resourceKey,
    }
  })

  return compact(navItems)
}

NavItems.propTypes = {
  currentRoute: PropTypes.string.isRequired
}

export default connect(state => ({
  currentRoute: state.routing.path
}))(NavItems)
