import React, { Component, PropTypes } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import classNames from 'classnames'

export default class SearchButton extends Component {

  static propTypes = {
    resourceKey: PropTypes.string.isRequired,
    isSimpleSearchMode: PropTypes.bool.isRequired,
    onSearch: PropTypes.func.isRequired,
    toggleSearchMode: PropTypes.func.isRequired
  };

  handleSearchButtonClick() {
    this.props.onSearch()
  }

  render() {
    const {
      resourceKey,
      isSimpleSearchMode,
      onSearch,
    } = this.props

    const assignmentsButton = (
      <Dropdown
        pullRight
        id='search-dropdown-button'
        className={classNames({
          'search-dropdown': true,
          'pull-right': !isSimpleSearchMode
        })}>

          <Button onClick={onSearch}>
            Search
          </Button>
      </Dropdown>
    )

    const vendorsButton = (
      <Button onClick={this.handleSearchButtonClick.bind(this)} id='search-button'>
        Search
      </Button>
    )

    return resourceKey === 'assignments'
      ? assignmentsButton
      : vendorsButton
  }
}
