import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import { isUndefined } from 'lodash'

import SearchButton from 'client/widgets/table/SearchButton'
import returnAction from 'client/actions/resource/utils/returnAction'

const keyCodes = {
  BACKSPACE: 8,
  ENTER: 13
}

export default class Search extends Component {

  static propTypes = {
    entityType: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    resourceKey: PropTypes.string.isRequired,
    searchText: PropTypes.string,
    FilterComponent: PropTypes.func,
    filterBy: PropTypes.string,
    sort: PropTypes.object
  };

  state = {
    isSimpleSearchMode: true,
  };

  handleSearchChange(event) {

    // Check if key
    const key = (keyCode) => {
      if (event && event.keyCode && event.keyCode === keyCode) {
        return true
      }

      // If not key, check to see if event
      return event ? false : true
    }

    if (
      event.type === 'click' ||
      isUndefined(event) ||
      key(keyCodes.ENTER) ||
      (key(keyCodes.BACKSPACE) && event.target.value === '')
    ) {
      this.search()
    }
  }

  search() {
    const {
      dispatch,
      resourceKey,
    } = this.props

    const inputText = this.refs.searchInput.value
    const searchText = returnAction('searchText', resourceKey)

    dispatch(searchText(inputText))
  }

  async handleExportClick() {
    const {
      dispatch,
      resourceKey
    } = this.props

    const exportCostEstimate = returnAction('exportCostEstimate', resourceKey)
    const query = await dispatch(exportCostEstimate())

    // FIXME: Revisit this browser hack for triggering download
    const link = document.createElement('a')
    link.download = ''
    link.href = '/api/export-cost-estimate?query=' + query
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  toggleSearchMode() {
    const { dispatch, resourceKey } = this.props

    const isSimpleSearchMode = !this.state.isSimpleSearchMode

    this.setState({
      isSimpleSearchMode
    })

    const invalidateQuery = returnAction('invalidateQuery', resourceKey)
    dispatch(invalidateQuery())
  }

  handleClearSearch() {
    const inputText = this.refs.searchInput.value
    if (inputText !== '') {
      this.refs.searchInput.value = ''
      this.search()
    }
  }

  render() {
    const {
      isSimpleSearchMode,
    } = this.state

    const {
      entityType,
      dispatch,
      filterBy,
      resourceKey,
      searchText,
      FilterComponent
    } = this.props

    const handlers = {
      toggleSearchMode: this.toggleSearchMode.bind(this)
    }

    const searchButton = (
      <SearchButton
        resourceKey={resourceKey}
        isSimpleSearchMode={isSimpleSearchMode}
        onSearch={this.handleSearchChange.bind(this)}
        {...handlers}
      />
    )

    return (

      // Vendors
      <div>
        { FilterComponent &&
          <FilterComponent
            className={'list-view-filter'}
            entityType={entityType}
            dispatch={dispatch}
            filterBy={filterBy}
            resourceKey={resourceKey}
            getSearchInputValue={() => {
              return this.refs.searchInput.value
            }}
            searchText={searchText}
          /> }


        {
          // Assignments
          isSimpleSearchMode

          ? <div className='form-group'>
              <div className='input-group pos-r'>
                <input
                  ref='searchInput'
                  onKeyUp={this.handleSearchChange.bind(this)}
                  type='text'
                  placeholder='Search...'
                  defaultValue={searchText}
                  className='form-control'
                />
                <span
                  className='icon icon-circle-with-cross'
                  title='Clear search'
                  onClick={this.handleClearSearch.bind(this)}>
                </span>
                <span className='input-group-btn'>
                  {searchButton}
                </span>
              </div>
            </div>
          : <div>
              {searchButton}
              <Button className='pull-right m-r-xsm' onClick={this.handleExportClick.bind(this)}>
                Export Cost Estimate Data
                <span className='icon icon-export m-l-xsm'></span>
              </Button>
            </div> }

      </div>
    )
  }
}
