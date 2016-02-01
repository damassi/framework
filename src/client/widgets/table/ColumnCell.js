import React from 'react'
import classNames from 'classnames'
import invariant from 'invariant'

// FIXME: Rename to <ColumnSortCell />

export default function ColumnCell(column, sortBy, sortOrder) {

  invariant(column && column.sortKey,
    '(client/widgets/table/ColumnCell.js) \n' +
    'Error creating <ColumnCell />: `sortKey` is undefined. Did you remember to add it ' +
    'to your <ListView /> table definition?'
  )

  const sortKey = column.sortKey.replace('[0]', '')
  const order = sortKey === sortBy && sortOrder

  const classes = classNames({
    icon: true,
    'icon-triangle-up': order === 'asc',
    'icon-triangle-down': order === 'desc'
  })

  return (
    <th key={column.displayName}>
      <span className={classes}></span> {column.displayName}
    </th>
  )
}
