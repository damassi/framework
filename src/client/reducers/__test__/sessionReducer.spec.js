/* eslint no-unused-vars: 0 */

import { expect } from 'chai'
import sessionReducer, { _initialState } from 'client/reducers/sessionReducer'
import * as types from 'client/constants/sessionActionTypes'

describe('(client/reducers/sessionReducer.js)', () => {
  it('#loginSuccess', () => {
    const PAYLOAD = {
      token: 'foo',
      user: {
        displayName: 'displayName',
        email: 'email'
      }
    }

    expect(
      sessionReducer.reducer(_initialState, {
        type: types.LOGIN_SUCCESS,
        payload: {
          ...PAYLOAD
        }
      })
    ).to.eql(
      {
        ..._initialState,
        ...PAYLOAD.user,
        token: PAYLOAD.token,
        loggedIn: true,
      }
    )
  })

  it('#loginError', () => {
    expect(
      sessionReducer.reducer(_initialState, {
        type: types.LOGIN_ERROR,
        payload: {
          error: {
            statusText: 'error!'
          }
        }
      })
    ).to.eql(
      {
        ..._initialState,
        loggedIn: false,
        errorStatusText: 'error!'
      }
    )
  })

  it('#logout', () => {
    expect(
      sessionReducer.reducer(_initialState, {
        type: types.LOGOUT
      })
    ).to.eql(
      {
        ..._initialState,
      }
    )
  })
})
