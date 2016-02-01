/**
 * Takes an actionMap and returns an actionMap that has been scoped
 * to a particular resourceKey, e.g.,
 *
 * {
 * 	 create() -> createVendors(),
 * 	 get() -> getVendors(),
 * 	 getCollection() -> getCollectionVendors()
 * 	 ...
 * }
 */

import invariant from 'invariant'
import { camelCase, isObject, isString } from 'lodash'

export default function namespaceActionsMap(actionsMap, resourceKey) {

  invariant(actionsMap && isObject(actionsMap),
    '(client/utils/namespaceActionsMap.js) \n' +
    'Error namespacing actionsMap: `actionsMap` is not an Object or undefined.'
  )

  invariant(resourceKey && isString(resourceKey),
    '(client/utils/namespaceActionsMap.js) \n' +
    'Error namespacing actionsMap: `resourceKey` is not a String or undefined.'
  )

  return Object.keys(actionsMap)
    .reduce((action, key) => ({
      [camelCase(key + '_' + resourceKey)]: actionsMap[key],
      ...action
    }), {})
}
