import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { head } from 'lodash'
import classNames from 'classnames'
import { RESULTS_PER_PAGE } from 'shared/configuration'

@connect(state => {
  const pathname = state.routing.path

  const basePath = head(
    pathname
      .replace('/', '')
      .split('/'))

  const collection = state[basePath].collection
  const totalPages = Math.ceil(collection.found / RESULTS_PER_PAGE) - 1
  const currPage = Number(state.routing.path.split('/').pop())
  const startPage = Math.max(1, currPage - 3)

  return {
    basePath,
    pathname,
    totalPages,
    startPage,
    currPage
  }
})
export default class Pagination extends Component {

  static propTypes = {
    basePath: PropTypes.string.isRequired,
    currPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
  };

  buildPageButtonLinks() {
    const { basePath, currPage } = this.props
    const nextPage = currPage + 1
    const prevPage = currPage > 1 ? currPage - 1 : 0
    const format = (newPage) => `/${basePath}/page/${newPage}`

    return {
      nextPageLink: format(nextPage),
      prevPageLink: format(prevPage)
    }
  }

  render() {
    const { totalPages, currPage } = this.props

    const classes = {
      prev: classNames({
        disabled: currPage === 0
      }),
      next: classNames({
        disabled: currPage >= totalPages
      })
    }

    const {
      nextPageLink,
      prevPageLink
    } = this.buildPageButtonLinks()

    return (
      <nav>
        <ul className='pagination'>
          { currPage > 0 &&
            <li className={classes.prev}>
              <Link to={prevPageLink} className='previous' aria-label='Previous'>
                <span className='icon icon-chevron-left' aria-hidden='true'></span>
                Previous
              </Link>
            </li> }


          { currPage <= (totalPages - 1) &&
            <li className={classes.next}>
              <Link to={nextPageLink} aria-label='Next'>
                Next
                <span className='icon icon-chevron-right' aria-hidden='true'></span>
              </Link>
            </li> }
        </ul>
      </nav>
    )
  }
}
