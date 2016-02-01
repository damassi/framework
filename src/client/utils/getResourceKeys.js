/**
 * Get all resourceKeys from shared/configuration.js
 */

import { isEmpty, isUndefined, pluck } from 'lodash'
import { resources } from 'shared/configuration'

export default function getResourceKeys() {

  // If we're in a test environment, create a fake resource key to test against
  if (__TEST__) {
    return ['test']
  }

  const resourceKeys = pluck(resources, 'initialState.resourceKey')

  if (isUndefined(resourceKeys) || isEmpty(resourceKeys)) {
    throw new Error(
      '(client/utils/getResourceKeys.js) \n' +
      'Error getting resource keys: No resource keys found.'
    )
  }

  return resourceKeys
}
