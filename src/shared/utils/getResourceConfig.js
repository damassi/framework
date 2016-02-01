import invariant from 'invariant'
import { first, isEqual, isString } from 'lodash'
import { resources } from 'shared/configuration'

export default function getResourceConfig(resourceKey) {

  if (__TEST__) {
    return {
      resourceKey: 'test',
      entityType: 'testEntityType',
      provider: 'dam',
      sort: {
        sortBy: '$name',
        sortOrder: 'desc'
      }
    }
  }

  invariant(resourceKey && isString(resourceKey),
    '(shared/utils/getResourceConfig.js) \n' +
    'Error getting resource: A valid resource key must be provided.'
  )

  const { initialState } = first(
    resources.filter(resource => {
      const initialState = resource.initialState

      invariant(initialState,
        '(shared/utils/getResourceConfig.js) \n' +
        'Error getting resource: A valid resource key must be provided.'
      )

      return isEqual(resourceKey, initialState.resourceKey)
    }))

  return {
    ...initialState
  }
}
