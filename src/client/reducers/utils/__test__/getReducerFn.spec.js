/* eslint no-unused-vars: 0 */

import { expect } from 'chai'
import getReducerFn from 'client/reducers/utils/getReducerFn'

describe('(client/reducers/utils/getReducerFn.js)', () => {
  const KEY = 'test'

  it('should filter out system actions in order to skip validation', () => {
    expect(getReducerFn(KEY, {}, '@@systemAction')).to.eql({
      isSystemAction: true
    })

    expect(getReducerFn(KEY, {}, '@@')).to.eql({
      isSystemAction: true
    })

    expect(getReducerFn(KEY, {}, 'redux')).to.eql({
      isSystemAction: true
    })

    expect(getReducerFn(KEY, { getAssignments: () => {} }, `GET_${KEY.toUpperCase()}`))
      .to.not.eql({
        isSystemAction: true
      })
  })

  it('should search inside app / resource reducers and return reducer fn name', () => {
    const actionsMap = {
      getTest() {},
      searchTest() {}
    }

    expect(
      getReducerFn(KEY, actionsMap, `GET_${KEY.toUpperCase()}`).name
    ).to.eql('getTest')

    expect(
      getReducerFn(KEY, actionsMap, `SEARCH_${KEY.toUpperCase()}`).name
    ).to.eql('searchTest')
  })

  it('should throw error if reducer fn name not found', () => {
    const actionsMap = {
      getVendors() {},
    }

    expect(() =>
      getReducerFn(KEY, actionsMap, 'FIND')
    ).to.throw('Error updating state: the function `find` for action type `FIND` not found within reducer. Are you sure your reducer method matches the camelCased version of the action being dispatched? Example: GET_USER -> getUser.')

    expect(() =>
      getReducerFn(KEY, actionsMap, 'GET')
    ).to.throw('Error updating state: the function `get` for action type `GET` not found within reducer. Are you sure your reducer method matches the camelCased version of the action being dispatched? Example: GET_USER -> getUser.')
  })
})
