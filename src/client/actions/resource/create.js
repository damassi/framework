import { pushPath } from 'redux-simple-router'
import { get } from 'lodash'
import getApi from 'client/actions/resource/utils/api'
import throwSyncError from 'client/utils/throwSyncError'
import * as url from 'shared/utils/url'
import returnAction from 'client/actions/resource/utils/returnAction'

export default function initialize(resourceKey, resourceActionTypes) {
  return function createAction(createProps) {

    return async (dispatch) => {
      const api = getApi(dispatch, resourceKey)

      try {
        const response = await api.create(createProps)
        const providerId = get(response.data, '$.id')

        if (response.data.code === 500) {
          throw response
        }

        const key = String(response.data.$.id)

        dispatch({
          type: resourceActionTypes.CREATE,
          payload: {
            member: response.data,
            providerId
          },
          meta: {

            transition: () => {

              // FIXME: Should be invalidating query
              const invalidateCache = returnAction('invalidateCache', resourceKey)
              dispatch(invalidateCache())

              dispatch(pushPath(url.member(resourceKey, key)))
            }
          }
        })

      } catch (error) {

        if (error.data && error.data.code === 500) {

          // FIXME Dispatch global error action
          /* eslint no-console: 0 */

          console.error(error.data)
        } else {
          throwSyncError('actions/resource/create.js', error)
        }
      }
    }
  }
}
