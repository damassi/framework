/**
 * Action creator for dispatching actions related to Elastic Search, and used in
 * conjunction with the action `query` (which is responsible for actually constructing
 * the query).
 *
 * Caching retrieval for list views is handled here as well.
 *
 * Works by incrementally merging and updating queries (see comment below) as they take
 * place in realtime, which is usefull for building up larger queries. See the advanced
 * search widget in Assignment Desk for a real-world example.
 */

import getApi from 'client/actions/resource/utils/api'
import throwSyncError from 'client/utils/throwSyncError'
import { cacheOptions } from 'shared/configuration'

const {
  client: {
    enabled: cacheEnabled
  }
} = cacheOptions

export default function initialize(resourceKey, resourceActionTypes) {
  return function searchAction(nextQuery) {

    return async (dispatch, getState) => {
      const api = getApi(dispatch, resourceKey)

      try {
        const { entityType, cache, query } = getState()[resourceKey]

        // Update tree through merge between old and new props
        const apiQuery = {
          entityType,
          ...query,
          ...nextQuery
        }

        const key = JSON.stringify(apiQuery)

        if (cacheEnabled && cache.has(key)) {
          const cached = cache.get(key)

          if (window.__LOGGING_ENABLED__ || __DEV__) {
            /* eslint no-console: 0 */

            console.log('\n')

            console.warn(
              '(client/actions/resource/search.js) \n\n' +
              'Cache: \n\n', key
            )
          }

          return dispatchPayload(cached)
        }

        const response = await api.search(apiQuery, resourceKey)

        const status =
          response.data.status || response.status

        if (status === 500) {
          return false
        }

        dispatchPayload(response.data, apiQuery)

      } catch (error) {
        throwSyncError('actions/resource/search.js', error)
      }

      function dispatchPayload(collection, apiQuery) {
        dispatch({
          type: resourceActionTypes.SEARCH,
          payload: {
            collection,
            query: apiQuery
          }
        })
      }
    }
  }
}
