/* eslint no-unused-vars: 0 */

import { expect } from 'chai'
import appReducer, { _initialState } from 'client/reducers/appReducer'
import * as types from 'client/constants/appActionTypes'

describe('(client/reducers/appReducer.js)', () => {
  it('#showError', () => {
    expect(
      appReducer.reducer(_initialState, {
        type: types.SHOW_ERROR,
        payload: {
          error: 'Error'
        }
      })
    ).to.eql(
      {
        ..._initialState,
        error: 'Error',
        handleSystemError: true
      }
    )
  })

  it('#showPreloader', () => {
    expect(
      appReducer.reducer(_initialState, {
        type: types.SHOW_PRELOADER,
        payload: {
          statusMsg: 'Showing...'
        }
      })
    ).to.eql(
      {
        ..._initialState,
        showPreloader: true,
        statusMsg: 'Showing...'
      }
    )
  })

  it('#hidePreloader', () => {
    expect(
      appReducer.reducer(_initialState, {
        type: types.HIDE_PRELOADER
      })
    ).to.eql(
      {
        ..._initialState,
        showPreloader: false
      }
    )
  })
})
