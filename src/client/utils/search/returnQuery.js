/**
 * Returns an Elastic Search query to dispatch as an action. Used in conjunction with
 * searchApi.js for resource-related functions like searching a collection within a
 * ListView.
 *
 *    USAGE:
 *
 *    const executeQuery = returnQuery(
 *      resourceKey,
 *      dispatch,
 *      buildResourceQuery(resourceKey)
 *    )
 *
 *    executeQuery({
 *      options: {
 *        entityType: 'photoAssignment',
 *        page: 20,
 *        sort: {
 *          sortBy: 'name'
 *          sortOrder: 'desc'
 *        }
 *      },
 *      searchText: 'Search this text'
 *    })
 *
 */

import { compose } from 'lodash'
import returnAction from 'client/actions/resource/utils/returnAction'

export default function returnQuery(resourceKey, dispatch, queries) {
  const query = returnAction('query', resourceKey, dispatch)

  const executeQuery = compose(
    dispatch,
    query,
    queries
  )

  return executeQuery
}
