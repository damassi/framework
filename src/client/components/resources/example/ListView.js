import React, { Component, PropTypes } from 'react'
import { cloneDeep } from 'lodash'
import rowSelector from 'client/widgets/table/utils/rowSelector'
import table from 'client/decorators/table'
import ColumnCell from 'client/widgets/table/ColumnCell'

const RESOURCE_KEY = 'example'

@table({
  resourceKey: RESOURCE_KEY,
  tableName: 'Example',
  columns: getColumns(RESOURCE_KEY),
  normalize
})
export default class ListView extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    const { children } = this.props

    return (
      <div>
        {children}
      </div>
    )
  }
}

function getColumns(resourceKey) {
  return [
    {
      displayName: 'Name',
      path: 'name',
      sortKey: 'name',
      rowHandlers: rowSelector(resourceKey),
      columnFn: ColumnCell,
    },
    {
      displayName: 'Description',
      path: 'description',
      sortKey: 'description',
      columnFn: ColumnCell,
    },

  ]
}

function normalize(tableData) {
  const out = cloneDeep(tableData)

  return out.map(entity => {
    return {
      ...entity,
      $: {
        ...entity.$,
      }
    }
  })
}
