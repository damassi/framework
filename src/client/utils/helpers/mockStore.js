import { expect } from 'chai'
import { applyMiddleware } from 'redux'
import { isArray, isFunction, isUndefined } from 'lodash'

export default function configureStore(middlewares) {
  return function mockStore(getState, expectedActions, done, { logActions = false } = {}) {
    if (!isArray(expectedActions)) {
      throw new Error('expectedActions should be an array of expected actions.')
    }

    if (!isUndefined(done) && !isFunction(done)) {
      throw new Error('done should either be undefined or function.')
    }

    function mockStoreWithoutMiddleware() {
      return {
        getState() {
          return isFunction(getState)
            ? getState()
            : getState
        },

        dispatch(action) {
          const expectedAction = expectedActions.shift()

          try {
            // NOTE:
            // We're removing redux-history-transition props here as they are untestable.

            if (expectedAction && expectedAction.meta) {
              delete expectedAction.meta
            }

            if (action && action.meta) {
              delete action.meta
            }

            if (logActions) {
              /* eslint no-console: 0 */
              console.warn('Expected:', expectedAction)
              console.warn('Actual:', action)
            }

            expect(action).to.eql(expectedAction)

            if (done && !expectedActions.length) {
              done()
            }
            return action
          } catch (error) {
            if (isFunction(done)) {
              done(error)
            } else {
              /* eslint no-console: 0 */
              console.error(error)
            }
          }
        }
      }
    }

    const mockStoreWithMiddleware = applyMiddleware(
      ...middlewares
    )(mockStoreWithoutMiddleware)

    return mockStoreWithMiddleware()
  }
}
