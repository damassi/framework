import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import {
  findWhere,
  get,
  isEmpty,
  isFunction,
  isString,
  isUndefined,
  reduce
} from 'lodash'

export default class Table extends Component {

  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    className: PropTypes.string,
    dispatch: PropTypes.func,
    sortBy: PropTypes.string,
    sortOrder: PropTypes.string
  };

  render() {
    const {
      data,
      dispatch,
      sortBy,
      sortOrder
    } = this.props

    const columns = buildColumns(this.props.columns, sortBy, sortOrder)

    const columnToSort = findWhere(this.props.columns, {
      sortKey: sortBy
    })

    const sortFn = get(columnToSort, 'sortFn', {})

    const sorted = isFunction(sortFn)
      ? sortFn(data, sortOrder)
      : data

    const body = buildBody(sorted, this.props.columns, dispatch)

    const tableClasses = classNames(this.props.className, {
      'table table-border': true,
      'table-hover': body.length > 0
    })

    return (
      <table {...this.props} className={tableClasses}>
        <thead key='thead'>
          <tr>{columns}</tr>
        </thead>
        <tbody key='tbody'>
          { isEmpty(body)
            ? <tr>
                <td className='text-center p-a-lg' colSpan={columns.length}>
                  0 results
                </td>
              </tr>
            : body }
        </tbody>
      </table>
    )
  }
}

function buildColumns(columns, sortBy, sortOrder) {
  const out = columns.map(column => {
    if (isString(column)) {
      return (
        <th key={column}>
          {column}
        </th>
      )
    } else if (isFunction(column.columnFn)) {
      return column.columnFn(column, sortBy, sortOrder)
    } else if (column.displayName) {
      return (
        <th key={column.displayName}>
          {column.displayName}
        </th>
      )
    }
  })

  return out
}

function buildBody(data, columns, dispatch) {
  const out = data.map((rowData, i) => {
    const row = columns.map((column, colIndex) => {
      let datum = undefined
      let key = undefined

      if (isString(column)) {
        datum = get(rowData, column)
        key = i + '-' + column
      } else if (column.path) {
        datum = get(rowData, column.path)
        key = i + '-' + column.path
      } else if (isFunction(column.rowFn)) {
        datum = column.rowFn(rowData)
        key = i + '-' + colIndex
      }

      return (
        <td key={key}>
          {datum}
        </td>
      )
    })

    return (
      <tr {...createRowHandler(columns, rowData, dispatch)} key={i}>
        {row}
      </tr>
    )
  })

  return out
}

// Iterates through the columns looking for a `rowHandlers` prop,
// which maps each onClick, onHover, etc into an object to apply
// to the table row.

function createRowHandler(columns, row, dispatch) {
  const rowHandlers = columns.filter(column => !isUndefined(column.rowHandlers))

  const boundRowHandlers = reduce(rowHandlers,
    (actionMap, column, index) => {
      const handlers = column.rowHandlers({
        column: rowHandlers[index],
        row,
        dispatch
      })

      return {
        ...handlers,
        ...actionMap
      }
    }, {})

  return boundRowHandlers
}
