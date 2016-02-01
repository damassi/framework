/**
 * Returns the provider from shared/configuration.js
 *
 *   USAGE:
 *
 *   const provider = getProvider(resourceKey)
 *
 *   assert(provider === 'recipedesk')
 */

import invariant from 'invariant'
import { get } from 'lodash'
import { resources } from 'shared/configuration'

export default function getProvider(resourceKey) {

  invariant(resourceKey,
    '(client/utils/getProvider.js) \n' +
    'Error getting provider: `resourceKey` is undefined.'
  )

  const resource = resources.filter(x => x.initialState.resourceKey === resourceKey)
  const provider = get(resource, '[0].initialState.provider')

  invariant(provider,
    '(client/utils/getProvider.js) \n' +
    `Error getting provider: Resource for ${resourceKey} for not found.`
  )

  return provider
}
