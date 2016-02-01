/**
 * Validate that a resourceReducer contains a resourceKey. Used for validating actions
 * during dispatch and on init.
 */

import invariant from 'invariant'
import { isString } from 'lodash'
import { resourceReducers } from 'client/reducers'

export default function keyInReducer(reducerKey) {

  invariant(reducerKey && isString(reducerKey),
    '(keyInReducer.js) \n' +
    'Error validating key in reducer: `reducerKey` is not a String or undefined.'
  )

  const foundKey = Object
    .keys(resourceReducers)
    .some(key => key === reducerKey)

  return foundKey
}
