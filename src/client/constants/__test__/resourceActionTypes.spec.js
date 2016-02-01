import { reduce } from 'lodash'
import { expect } from 'chai'
import createResourceActionTypes from 'client/constants/resourceActionTypes'

describe('(client/constants/resourceActionTypes.js)', () => {
  it('should build resourceActionTypes', () => {
    const RESOURCE_KEY = 'example'
    const actionTypes = createResourceActionTypes(RESOURCE_KEY)

    const mapsKeys = reduce(actionTypes, (isMapped, value) => {
      return value.includes(RESOURCE_KEY.toUpperCase())
    }, false)

    expect(mapsKeys).to.be.true
  })
})
