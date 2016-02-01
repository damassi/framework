/**
 * Configure redux here, by composing middleware and building a store out of all
 * application reducers.
 *
 * TODO: Do we still need the hot loading here? Worth researching.
 */

import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import installHistoryTransitions from 'redux-history-transitions'
import { logging } from 'shared/configuration'
import rootReducer from 'client/reducers'
import crashReporter from 'client/middleware/crashReporter'
import authorized from 'client/middleware/authorized'

export default function configureStore(initialState) {
  const middleware = [
    thunk,
    crashReporter,
    authorized,
  ]

  if (process.env.NODE_ENV !== 'production') {
    if (logging.client.enabled) {
      /* eslint no-unused-vars: 0 */

      const logger = createLogger({
        collapsed: true
      })

      // NOTE: Uncomment for advanced Redux event stream logging
      middleware.push(logger)
    }
  }

  const buildStore = compose(
    applyMiddleware(...middleware),
    installHistoryTransitions(createBrowserHistory)
  )(createStore)

  const store = buildStore(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('client/reducers', () => {
      const nextRootReducer = require('client/reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
