/**
 * Similar to how we create resource actions, resource ACTION_TYPES are dynamically
 * created here, and keyed by resource. When adding a new resource / framework action,
 * be sure to add in a corresponding type here.
 */

import invariant from 'invariant'
import { isString } from 'lodash'

export default function createResourceActionTypes(resourceKey) {

  invariant(isString(resourceKey),
    '(client/constants/resourceActionTypes.js) \n' +
    'Error creating resourceActionTypes: `resourceKey` must be a string.'
  )

  return build(resourceKey, [
    'CREATE',
    'EDIT',
    'GET',
    'FILTER',
    'INVALIDATE_CACHE',
    'INVALIDATE_QUERY',
    'QUERY',
    'REMOVE',
    'SEARCH',
    'SEARCH_TEXT',
    'SORT',
    'UPDATE_ENTITY_TYPE',
    'UPDATE_FORM',
    'UPDATE_STATUS'
  ])
}

function build(resourceKey, actionTypes) {
  return actionTypes.reduce((typeMap, ACTION) => ({
    [ACTION]: ACTION + '_' + resourceKey.toUpperCase(),
    ...typeMap
  }), {})
}
