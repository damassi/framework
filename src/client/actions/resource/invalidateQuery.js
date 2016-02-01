/**
 * Invalidates the current elastic search query. Useful for triggering a fetch to the
 * server when something changes.
 */

export default function initialize(resourceKey, resourceActionTypes) {
  return function invalidateQueryAction() {
    return {
      type: resourceActionTypes.INVALIDATE_QUERY
    }
  }
}
