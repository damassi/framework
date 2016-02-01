/**
 * Get individual entites from the DAM either through an async request or via retrieval
 * from the cache.
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
  return function getAction(providerId) {

    return async (dispatch, getState) => {
      const api = getApi(dispatch, resourceKey)

      try {
        const { cache } = getState()[resourceKey]
        const key = String(providerId)

        if (cacheEnabled && cache.has(key)) {
          return dispatchPayload(cache.get(key))
        }

        const response = await api.get(providerId)
        dispatchPayload(response.data)

      } catch (error) {
        throwSyncError('actions/resource/get.js', error)
      }

      function dispatchPayload(payload) {
        dispatch({
          type: resourceActionTypes.GET,
          payload: {
            member: payload,
            providerId
          }
        })
      }
    }
  }
}
