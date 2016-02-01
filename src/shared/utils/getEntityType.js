import { isString } from 'lodash'
import invariant from 'invariant'
import getResourceConfig from 'shared/utils/getResourceConfig'

export default function getEntityType(resourceKey) {

  invariant(resourceKey && isString(resourceKey),
    'Error getting entity type: A valid resource key must be provided.'
  )

  const {
    entityType
  } = getResourceConfig(resourceKey)

  return entityType
}
