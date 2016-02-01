/**
 * Returns a keyed actionMap of each resource action, e.g.,
 *
 * {
 *   assignments: {
 *     createAssignments(),
 *     editAssignments(),
 *     removeAssignments()
 *   },
 *   vendors: {
 *     createVendors(),
 *     editVendors(),
 *     removeVendors()
 *   },
 *   ...
 * }
 *
 * TODO:
 *
 * In the futute, a more robust solution would be to key each resource by something
 * that has less potential to clash. ES6 Symbols would be a good candidate here, since
 * they are unique and immutable.
 *
 */

import invariant from 'invariant'
import { isArray, isFunction } from 'lodash'

export default function buildResourceActions(resourceActions, resourceKeys) {

  invariant(resourceActions && isFunction(resourceActions),
    '(client/actions/resource/utils/buildResourceActions.js) \n' +
    'Error building resource actions: `resourceActions` is not an Object or undefined.'
  )

  invariant(resourceKeys && isArray(resourceKeys),
    '(client/actions/resource/utils/buildResourceActions.js) \n' +
    'Error building resource actions: `resourceKeys` is not an Array or undefined.'
  )

  return resourceKeys.reduce((actionMap, resourceKey) => ({
    [resourceKey]: {
      ...resourceActions(resourceKey),
    },
    ...actionMap
  }), {})
}
