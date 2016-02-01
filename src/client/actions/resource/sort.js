/**
 * Sort a collection according to a direction or a column. Also useful for passing back
 * additional parameters to elastic search, like "sortMissing" (for sorting items that
 * are empty similar to how sorting takes place alphabetically -- empty comes first).
 */

export default function initialize(resourceKey, resourceActionTypes) {
  return function sortAction(sortBy, sortMissing) {

    return (dispatch, getState) => {
      const { sortOrder } = getState()[resourceKey].sort

      const toggledOrder = (sortOrder === 'asc')
        ? 'desc'
        : 'asc'

      dispatch({
        type: resourceActionTypes.SORT,
        payload: {
          sort: {
            sortBy,
            sortOrder: toggledOrder,
            sortMissing
          }
        }
      })
    }
  }
}
