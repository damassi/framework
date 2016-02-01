/**
 * Session actions deal with things like login, logout, restoring state and cookie
 * management.
 *
 * TODO:
 *
 * Better error handling for error states, 404, etc. Also, after LOGIN_SUCCESS
 * we need to add a default /route to navigate to. See line 57 below.
 */


import { pushPath } from 'redux-simple-router'
import cookie from 'react-cookie'
import getApi from 'client/actions/resource/utils/api'
import * as types from 'client/constants/sessionActionTypes'
import * as appActions from 'client/actions/appActions'
import throwSyncError from 'client/utils/throwSyncError'
import { DEFAULT_ROUTE } from 'client/routes'
import { persistentCacheOptions } from 'shared/configuration'

// TODO: This will need to be rewritten when Chris W's new shared Auth flow is in

const {
  sessionCookie,
} = persistentCacheOptions

export function login(username, password) {
  return async (dispatch, getState) => {
    const api = getApi(dispatch)

    try {
      const response = await api.login(username, password)
      const statusCode = response.data.statusCode

      if (statusCode === 200) {
        const { token, user } = response.data

        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: {
            token,
            user
          },

          meta: {

            // Once a user has logged in successfully, redirect the user to a route
            // inside of the application.

            transition: () => {
              const { session } = getState()

              if (session.loggedIn) {
                delete session.errorStatusText
                cookie.save(sessionCookie.name, session, sessionCookie.options)

                // TODO:
                //
                // This can be made to be dynamic, so we don't have to update
                // the path on a per-app basis. Note  that `example` corresponds to a
                // resourceKey set in shared/configuration.js. It can, in practice,
                // go wherever.

                dispatch(pushPath(DEFAULT_ROUTE))
              }
            }
          }
        })
      } else if (statusCode === 401) {
        dispatch({
          type: types.LOGIN_ERROR,
          payload: {

            // TODO: This error message can be updated to be more dynamic, as returned
            // from the server response.

            error: {
              statusText: 'Please check your username or password'
            }
          }
        })

        dispatch(appActions.hidePreloader())
      }
    } catch (error) {
      throwSyncError('actions/sessionActions.js', error)
    }
  }
}

export function logout() {
  return async (dispatch) => {
    const api = getApi(dispatch)

    cookie.remove(sessionCookie.name)

    try {
      const response = await api.logout()

      if (response.data.success) {
        dispatch({
          type: types.LOGOUT
        })
      }
    } catch (error) {
      throwSyncError('actions/sessionActions.js', error)
    }
  }
}

export function restore(session) {
  return {
    type: types.RESTORE,
    payload: {
      ...session,
    }
  }
}
