/**
 * Update the Elastic Search query that will be dispatched via a `search` action.
 */

export default function initialize(resourceKey, resourceActionTypes) {
  return function queryAction(query) {
    return {
      type: resourceActionTypes.QUERY,
      payload: {
        query
      }
    }
  }
}
