/**
 * Used for applying filters to a collection.
 */

export default function initialize(resourceKey, resourceActionTypes) {
  return function filterAction(filter) {
    return {
      type: resourceActionTypes.FILTER,
      payload: {
        filter
      }
    }
  }
}
