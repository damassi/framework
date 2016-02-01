/**
 * Middleware for checking to see if a user is authenticated. If so, simply pass through,
 * if not, kick the user back to /login.
 */

import cookie from 'react-cookie'
import { replacePath } from 'redux-simple-router'
import { restore as restoreSession } from 'client/actions/sessionActions'
import { persistentCacheOptions } from 'shared/configuration'

const {
  sessionCookie,
} = persistentCacheOptions

export default function authorized(store) {
  return next => action => {
    const {
      session: {
        loggedIn
      }
    } = store.getState()

    if (!loggedIn) {
      const session = cookie.load(sessionCookie.name)

      // After login, if we find a session we restore it and populate the users
      // brands with content.

      if (session) {
        next(restoreSession(session))

        // Not logged in, redirect.
      } else {
        if (!__TEST__ && window.location.pathname !== '/login') {
          window.location.replace('/login')
        }
      }
    }

    return next(action)
  }
}
