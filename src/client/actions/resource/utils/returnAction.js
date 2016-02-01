/**
 * Return an action to be dispatched within the system. Only used for framework-specific
 * actions and for validating that actions can be dispatched safely.
 *
 *   USAGE:
 *
 *   const myAction = returnAction('search', 'assignments')
 *   dispatch(myAction())
 */

import invariant from 'invariant'
import { camelCase, isFunction, isString } from 'lodash'
import keyInReducer from 'client/reducers/utils/keyInReducer'
import actions from 'client/actions/resourceActions'

export default function returnAction(actionName, resourceKey) {

  invariant(actionName && isString(actionName),
    '(client/actions/resource/utils/returnAction.js) \n' +
    'Error returning action: `actionName` is not a string or undefined.'
  )

  const resourceActions = actions[resourceKey]
  const actionMethod = camelCase(actionName + '_' + resourceKey)
  const action = resourceActions[actionMethod]

  invariant(resourceKey && keyInReducer(resourceKey),
    '(client/actions/resource/utils/returnAction.js) \n' +
    `Error returning action: Resource key \`${resourceKey}\` not found within app state.`
  )

  invariant(action && isFunction(action),
    '(client/actions/resource/utils/returnAction.js) \n' +
    `Error returning action: Cannot find ${actionName}.js within client/actions/resource, ` +
    'or it has not been mounted in createResourceActions.js'
  )

  return action
}
