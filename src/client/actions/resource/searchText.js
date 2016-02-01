/**
 * Update the search text as it comes through via a list view search bar.
 */

export default function initialize(resourceKey, resourceActionTypes) {
  return function searchTextAction(searchText) {
    return {
      type: resourceActionTypes.SEARCH_TEXT,
      payload: {
        searchText
      }
    }
  }
}
