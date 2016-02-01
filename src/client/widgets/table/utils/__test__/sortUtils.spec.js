import { expect } from 'chai'
import { sortByOrder } from 'lodash'
import * as sortUtils from 'client/widgets/table/utils/sortUtils'

describe('(client/widgets/table/utils/sortUtils.js)', () => {
  it('should sort by friendly id', () => {
    const data = [
      { assignment_friendly_id: 'td-10' },
      { assignment_friendly_id: 'td-2' },
      { assignment_friendly_id: 'td-12' },
    ]

    const ordered = sortByOrder(data, [
      sortUtils.sortByFriendlyId
    ], 'asc')

    expect(ordered).to.eql([
      { assignment_friendly_id: 'td-2' },
      { assignment_friendly_id: 'td-10' },
      { assignment_friendly_id: 'td-12' }
    ])
  })

  it('should sort by property name', () => {
    const data = [
      {
        name: 'chris',
        address: 'home'
      },
      {
        name: 'katherine',
        address: 'seattle'
      },
      {
        name: 'family',
        address: 'space'
      },
    ]

    const ordered = sortByOrder(data, [
      sortUtils.sortOrder('name')
    ], 'asc')

    expect(ordered).to.eql([
      {
        name: 'chris',
        address: 'home'
      },
      {
        name: 'family',
        address: 'space'
      },
      {
        name: 'katherine',
        address: 'seattle'
      },
    ])

    const addressOrder = sortByOrder(data, [
      sortUtils.sortOrder('address')
    ], 'desc')

    expect(addressOrder).to.eql([
      {
        name: 'katherine',
        address: 'seattle'
      },
      {
        name: 'family',
        address: 'space'
      },
      {
        name: 'chris',
        address: 'home'
      },
    ])
  })
})
