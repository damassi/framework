/* eslint no-unused-vars: 0 */

import { expect } from 'chai'
import createReducer from 'client/reducers/utils/createReducer'
import buildResourceReducers from 'client/reducers/resourceReducer'

describe('(client/reducers/utils/createReducer.js)', () => {
  const KEY = 'test'

  it('should create a resoure reducer by key', () => {
    const reducer = createReducer(KEY, {}, {})
    expect(reducer).to.exist
  })

  it('should error if the actionType is missing the resource key', () => {
    const reducerActionsMap = {
      search: (state, action) => ({
        ...state,
        ...action.payload
      })
    }

    const reducer = createReducer(KEY, reducerActionsMap, {})

    expect(() => {
      reducer({ sort: {} }, {
        type: 'SORT',
        payload: {
          sort: {
            sortBy: '$name',
            sortOrder: 'desc'
          }
        }
      })
    }).to.throw(
      'Error updating state: the function `sort` for action type `SORT` not found within ' +
      'reducer. Are you sure your reducer method matches the camelCased version ' +
      'of the action being dispatched? Example: GET_USER -> getUser.'
    )
  })

  it('should call methods defined in the actions map by resourceKey', () => {
    const reducerActionsMap = {
      sortTest: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    }

    const reducer = createReducer(KEY, reducerActionsMap, {})

    expect(
      reducer({ sort: {} }, {
        type: `SORT_${KEY.toUpperCase()}`,
        payload: {
          sort: {
            sortBy: '$name',
            sortOrder: 'desc'
          }
        }
      })
    ).to.eql({
      sort: {
        sortBy: '$name',
        sortOrder: 'desc'
      }
    })
  })

  it('should recognized processed resourceReducers and call function aliases', () => {
    const {
      [KEY]: {
        actionsMap,
      }
    } = buildResourceReducers([KEY])

    const reducer = createReducer(KEY, actionsMap, {})

    expect(
      reducer({ sort: {} }, {
        type: `SORT_${KEY.toUpperCase()}`,
        payload: {
          sort: {
            sortBy: '$name',
            sortOrder: 'desc'
          }
        }
      })
    ).to.eql({
      sort: {
        sortBy: '$name',
        sortOrder: 'desc'
      }
    })
  })

  it('should skip createReducer for simplicity', () => {
    const {
      [KEY]: {
        reducer
      }
    } = buildResourceReducers([KEY])

    expect(
      reducer({ sort: {} }, {
        type: `SORT_${KEY.toUpperCase()}`,
        payload: {
          sort: {
            sortBy: '$name',
            sortOrder: 'desc'
          }
        }
      })
    ).to.eql({
      sort: {
        sortBy: '$name',
        sortOrder: 'desc'
      }
    })
  })
})
