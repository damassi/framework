/**
 * Action for posting edits to individual entities. Once the edit has been made, we
 * invalidate the cache for a particular resource so that the changes can be seen,
 * and redirect back to the member entitiy.
 */

import { pushPath } from 'redux-simple-router'
import getApi from 'client/actions/resource/utils/api'
import throwSyncError from 'client/utils/throwSyncError'
import * as url from 'shared/utils/url'
import returnAction from 'client/actions/resource/utils/returnAction'

export default function initialize(resourceKey, resourceActionTypes) {
  return function editAction(provider, providerId, updateProps) {

    return async (dispatch) => {
      const api = getApi(dispatch, resourceKey)

      try {
        const response = await api.edit(provider, providerId, updateProps)
        const editedProviderId = response.data.$.id

        dispatch({
          type: resourceActionTypes.EDIT,
          payload: {
            member: response.data
          },
          meta: {

            transition: () => {

              // FIXME: Should be invalidating cache rather than query
              const invalidateCache = returnAction('invalidateCache', resourceKey)

              dispatch(invalidateCache())
              dispatch(pushPath(url.member(resourceKey, editedProviderId)))
            }
          }
        })

      } catch (error) {
        throwSyncError('actions/resource/edit.js', error)
      }
    }
  }
}
