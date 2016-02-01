/**
 * Remove's a member from the DAM. Once removed, reset cache and redirect back to
 * the collection list view.
 */

import { replacePath } from 'redux-simple-router'
import getApi from 'client/actions/resource/utils/api'
import throwSyncError from 'client/utils/throwSyncError'
import * as url from 'shared/utils/url'
import returnAction from 'client/actions/resource/utils/returnAction'

export default function initialize(resourceKey, resourceActionTypes) {
  return function removeAction(providerId) {

    return async (dispatch) => {
      const api = getApi(dispatch, resourceKey)

      try {
        const response = await api.remove(providerId)

        if (response.data.response === 'Could not find any entity with the provided Id') {

          /* eslint no-console: 0 */
          console.error(response.data)

          // Found Entry, continue
        } else {
          const removedMember = response.data
          const removedProviderId = removedMember.$.id

          dispatch({
            type: resourceActionTypes.REMOVE,
            payload: {
              member: removedMember,
              providerId: removedProviderId
            },
            meta: {

              transition: () => {

                // FIXME should be invalidating cache instead of query
                // const invalidateQuery = returnAction('invalidateQuery', resourceKey)

                const invalidateCache = returnAction('invalidateCache', resourceKey)
                dispatch(invalidateCache())

                // Add slight delay due to transaction between Elastic Search
                // and AWS. Might want to revisit at some point.

                setTimeout(() => {
                  dispatch(replacePath(url.collection(resourceKey)))
                }, 800)
              }
            }
          })
        }

      } catch (error) {
        throwSyncError('actions/resource/remove.js', error)
      }
    }
  }
}
