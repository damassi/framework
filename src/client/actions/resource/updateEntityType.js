/**
 * Updates the overall entity type for a collection. A real world example can be found
 * in assignment desk, when we filter vendors by company or person -- each of those is
 * a different entityType (person_vendor, company_vendor, etc).
 */

import invariant from 'invariant'
import { isString } from 'lodash'

export default function initialize(resourceKey, resourceActionTypes) {
  return function updateEntityType(entityType) {

    invariant(entityType && isString(entityType),
      '(actions/resource/updateEntityType.js) \n' +
      'Error updating `entityType`: `entityType` is not a string or undefined.'
    )

    return {
      type: resourceActionTypes.UPDATE_ENTITY_TYPE,
      payload: {
        entityType
      }
    }
  }
}
