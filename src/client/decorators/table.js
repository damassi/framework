/**
 * Display a @collection within a table. See components/resources/edit/ListView.js for
 * a sample implementation.
 *
 * TODO:
 *
 * This can be cleaned up quite a bit, and needs a bit of work. See FIXME's below.
 */

import React, { Component, PropTypes } from 'react'
import Inspector from 'client/components/shared/Inspector'
import { connect } from 'react-redux'
import { findWhere, get, isEmpty } from 'lodash'
import Table from 'client/widgets/table/Table'
import collection from 'client/decorators/collection'
import returnAction from 'client/actions/resource/utils/returnAction'
import Pagination from 'client/widgets/table/Pagination'
import Search from 'client/widgets/table/Search'

export default function initializeTable({
  columns,
  defaultSort,

  // TODO: Update ?q='' on search and allow for default search values to be passed in
  // initialSearchQuery = '',

  normalize = x => x,
  resourceKey,
  tableName = '',

  FilterComponent,
  filterFn = x => x
}) {

  return (ResourceList) => {

    @connect(state => ({
      activeBrand: state.session.activeBrand,
      currentPage: state[resourceKey].page,
      entityType: state[resourceKey].entityType,
      searchText: state[resourceKey].searchText,
      sort: get(state[resourceKey], 'sort'),

      // FIXME: Can destructure from the above
      sortBy: get(state[resourceKey], 'sort.sortBy'),
      sortOrder: get(state[resourceKey], 'sort.sortOrder'),
      showSearchPreloader: state.app.showSearchPreloader
    }))
    @collection(resourceKey, {

      // FIXME: Default sorting appears to be overwritten by above
      sortBy: get(defaultSort, 'sortBy', 'name'),
      sortOrder: get(defaultSort, 'sortOrder', 'asc')
    })
    class TableDecorator extends Component {

      static propTypes = {
        collection: PropTypes.shape({
          entities: PropTypes.array.isRequired,
          found: PropTypes.number.isRequired,
          start: PropTypes.number.isRequired
        }).isRequired,
        entityType: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
        resourceKey: PropTypes.string.isRequired,
        searchText: PropTypes.string.isRequired,

        // FIXME: Do we need this
        sort: PropTypes.object,
        sortBy: PropTypes.string,
        sortOrder: PropTypes.string
      };

      handleColumnClick(event) {
        const { tagName } = event.target

        // FIXME: Table arrows are picking up target
        // FIXME: Refactor to be more flexible
        const isHeader = tagName === 'TH' || tagName === 'SPAN'

        if (!isHeader) {
          return false
        }

        const columnName = get(event.target, 'innerText', '').trim()
        const column = findWhere(columns, { displayName: columnName })

        // FIXME: Need to listen for arrows too
        if (column && !column.sortDisabled) {
          this.sortColumn(columnName, column)
        }
      }

      sortColumn(columnName, column) {
        const {
          dispatch,
          resourceKey,
        } = this.props

        const sortKey = get(column, 'sortKey', '').replace('[0]', '')
        const sortMissing = get(column, 'sortMissing', '')
        const sort = returnAction('sort', resourceKey)

        dispatch(sort(sortKey, sortMissing))
      }

      render() {
        const {
          collection: { entities, found, start, searchResults },
          dispatch,
          entityType,
          resourceKey,
          searchText,
          sortBy,
          sortOrder
        } = this.props

        const startIndex = start + 1
        const filtered = filterFn(entities)
        const data = normalize(filtered)

        let showSearchBar = true

        if (!isEmpty(searchResults)) {
          if (isEmpty(entities)) {
            showSearchBar = false
          }
        }

        return (
          <div className='list-view' id={resourceKey}>
            <div className='row'>
              <div className='col-xs-6 table-item-counter'>
                { isEmpty(data)
                  ? <strong>
                      0 {tableName}
                    </strong>
                  : <span>
                      <strong>{startIndex}–{startIndex + (data.length - 1)}</strong> of <strong>{found} {tableName}</strong>
                    </span> }
              </div>

              { showSearchBar &&
                <div className={'col-xs-6'}>
                  <Search
                    dispatch={dispatch}
                    FilterComponent={FilterComponent}
                    entityType={entityType}
                    resourceKey={resourceKey}
                    searchText={searchText}
                    sort={this.props.sort}
                    ref='searchContainer'
                  />
                </div> }
            </div>

            <div className={'table-responsive'}>
              <ResourceList entities={data}>
                <Table
                  columns={columns}
                  data={data}
                  dispatch={dispatch}
                  onClick={this.handleColumnClick.bind(this)}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  ref='wrappedComponent'
                />
              </ResourceList>
            </div>

            <Pagination />

            <Inspector
              data={data}
            />
          </div>
        )
      }
    }

    return TableDecorator
  }
}
