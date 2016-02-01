/**
 * Returns the resourceKey from window.location.pathname. Often used within child
 * resource components for getting the resourceKey to dispatch a framework action.
 *
 *   COMMON USAGE:
 *
 *   @connect(state => ({
 *     resourceKey: getResourceKey(state.routing.path)
 *   }))
 */

import invariant from 'invariant'
import { memoize } from 'lodash'

const getResourceKey = memoize((pathname) => {
  const [, resourceKey] = pathname.split('/')

  invariant(resourceKey,
    '(client/utils/getResourceKey.js) \n' +
    `Error getting resourceKey: 'resourceKey' for ${pathname} not found.`
  )

  return resourceKey
})

export default getResourceKey
