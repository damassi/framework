import { appReducers, resourceReducers } from 'client/reducers'

import {
  camelCase,
  head,
  isFunction,
  isString,
  some
} from 'lodash'

export default function getReducerFn(reducerKey, actionsMap, actionType) {
  const isSystemAction = isString(actionType) && (
    actionType.includes('@@') || actionType.includes('redux')
  )

  // System actions are prefixed with @@, e.g., '@@redux'
  if (isSystemAction) {
    return { isSystemAction }
  }

  const baseAction = camelCase(head(actionType.split('_')))
  const camelizedActionType = camelCase(actionType)
  const foundIn = find(camelizedActionType)

  if (foundIn(appReducers) || foundIn(resourceReducers)) {
    return actionsMap[camelizedActionType]
  }

  throw new Error(
    '(getReducerFn.js) \n' +
    `Error updating state: the function \`${baseAction}\` for action ` +
    `type \`${actionType}\` not found within reducer. Are you sure ` +
    'your reducer method matches the camelCased version of the action ' +
    'being dispatched? Example: GET_USER -> getUser.'
  )
}

// String -> Func -> Bool
function find(actionType) {
  return (reducers) => {
    return some(reducers, (reducer) => {
      const { actionsMap } = reducer
      return isFunction(actionsMap && actionsMap[actionType])
    })
  }
}
