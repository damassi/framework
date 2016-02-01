/* eslint no-unused-vars: 0 */

import { isEmpty } from 'lodash'
import { expect } from 'chai'
import initResourceReducer from 'client/reducers/resourceReducer'

describe('(client/reducers/resourceReducer.js)', () => {
  const KEY = 'test'

  let reducer = undefined
  let initialState = undefined

  beforeEach(() => {
     const { test } = initResourceReducer([KEY])
     reducer = test.reducer
     initialState = test._initialState
  })

  const actionType = (actionType) => actionType + '_' + KEY.toUpperCase()

  it('#create', () => {
    const payload = {
      member: {
        $name: 'chris'
      }
    }

    expect(
      reducer(initialState, {
        type: actionType('CREATE'),
        payload: {
          ...payload
        }
      })
    ).to.eql(
      {
        ...initialState,
        member: {
          $name: 'chris'
        }
      }
    )
  })

  it('#edit', () => {
    const payload = {
      member: {
        $: {
          id: '0'
        },
        $name: 'chris'
      }
    }

    expect(
      reducer(initialState, {
        type: actionType('EDIT'),
        payload: {
          ...payload
        }
      })
    ).to.eql(
      {
        ...initialState,
        ...payload
      }
    )
  })

  it('#updateEntityType', () => {
    const payload = {
      entityType: 'vendors'
    }

    expect(
      reducer(initialState, {
        type: actionType('UPDATE_ENTITY_TYPE'),
        payload: {
          ...payload
        }
      })
    ).to.eql(
      {
        ...initialState,
        ...payload
      }
    )
  })

  it('#get', () => {
    const payload = {
      member: {
        $name: 'chris'
      },
      providerId: 'providerId'
    }

    expect(
      reducer(initialState, {
        type: actionType('GET'),
        payload: {
          ...payload
        }
      })
    ).to.eql(
      {
        ...initialState,
        member: {
          ...payload.member
        }
      }
    )
  })

  // FIXME

  it('TODO #search', () => {

  })

  it('TODO #remove', () => {

  })

  it('#invalidateCache', () => {
    const state = reducer(initialState, {
      type: actionType('INVALIDATE_CACHE'),
    })

    expect(isEmpty(state.cache.__data__)).to.be.true
  })

  it('#sort', () => {
    const payload = {
      sort: {
        sortBy: 'name',
        sortOrder: 'desc'
      }
    }

    expect(
      reducer(initialState, {
        type: actionType('SORT'),
        payload: {
          ...payload
        }
      })
    ).to.eql(
      {
        ...initialState,
        ...payload
      }
    )
  })

  it('#updateForm', () => {
    const payload = {
      form: {
        name: 'name',
        occupation: 'occupation',
        noEmptyStrings: '',
        noEmptyArrays: [{
          name: ''
        }]
      }
    }

    expect(
      reducer(initialState, {
        type: actionType('UPDATE_FORM'),
        payload: {
          ...payload
        }
      })
    ).to.eql(
      {
        ...initialState,
        form: {
          ...payload.form,
          noEmptyStrings: undefined,
          noEmptyArrays: [{
            name: undefined
          }]
        }
      }
    )
  })
})
