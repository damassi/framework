/**
 * All API communication should be consolidated here, and called from actions.
 */

import http from 'axios'
import invariant from 'invariant'
import { isObject, isString } from 'lodash'
import * as appActions from 'client/actions/appActions'
import getEntityType from 'shared/utils/getEntityType'

export default function getApi(dispatch, resourceKey) {

  /**
   * Login
   */
  async function login(username, password) {
    validate(username, isString, 'login')
    validate(password, isString, 'login')

    showPreloader()
    const response = await http.post('/api/login', { username, password })

    return response
  }

  /**
   * Logout
   */
  async function logout() {
    return await http.get('/api/logout')
  }

  // Resource Actions
  // ---------------------------------------------------------------------------

  /**
   * Create
   */
  async function create(createProps) {
    validate(createProps, isObject, 'create')

    showPreloader()
    const response = await http.post(`/api/${resourceKey}/create`, createProps)
    hidePreloader()

    return response
  }

  /**
   * Edit
   */
  async function edit(provider, providerId, updateProps) {
    validate(provider, isString, 'edit')
    validate(providerId, isString, 'edit')
    validate(updateProps, isObject, 'edit')

    showPreloader('Saving...')
    const response = await http.post(`/api/${resourceKey}/${providerId}/edit`, {
      provider,
      providerId,
      updateProps
    })
    hidePreloader()

    return response
  }

  /**
   * Get
   */
  async function get(providerId) {
    validate(providerId, isString, 'get')

    const entityType = getEntityType(resourceKey)

    showPreloader()
    const response = await http.get(`/api/${resourceKey}/${providerId}?entityType=${entityType}`)
    hidePreloader()

    return response
  }

  /**
   * Remove
   */
  async function remove(providerId) {
    validate(providerId, isString, 'remove')

    showPreloader()
    const response = await http.delete(`/api/${resourceKey}/${providerId}`, {
      providerId
    })
    hidePreloader({ delay: 500 })

    return response
  }

  /**
   * Elastic Search
   */
  async function search(searchQuery, resourceKey) {
    validate(searchQuery, isObject, 'search')

    const query = {
      ...searchQuery
    }

    const { entityType } = query
    delete query.entityType

    showPreloader()
    const response = await http.post(`/api/search`, {
      entityType,
      query,
      resourceKey
    })
    hidePreloader()

    return response
  }


  // Helpers
  // ---------------------------------------------------------------------------

  function showPreloader(msg) {
    if (!__TEST__) {
      dispatch(appActions.showPreloader(msg))
    }
  }

  function hidePreloader({ delay = 100 } = {}) {
    if (!__TEST__) {
      setTimeout(() => {
        dispatch(appActions.hidePreloader())
      }, delay)
    }
  }

  return {

    // Generic
    login, logout,

    // Resources
    create, edit, get, remove, search
  }
}

function validate(prop, type, fnName) {
  invariant(prop && type(prop),
    '(api.js) \n' +
    `Clientside API error: Expecting (${type.name}) for ${prop}. Check your ` +
    `client/actions/resource/utils/api.js ${fnName}() implementation, or the properties ` +
    'being passed in.'
  )
}
