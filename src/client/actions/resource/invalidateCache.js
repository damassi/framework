/**
 * Invalidate cache for an entire resource. This resets MapCache back to a pristine state.
 */

export default function initialize(resourceKey, resourceActionTypes) {
  return function invalidateCacheAction() {
    return {
      type: resourceActionTypes.INVALIDATE_CACHE
    }
  }
}
