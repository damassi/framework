/**
 * The resource reducer manages all framework related state, and will rarely be updated
 * unless new framework functionality is desired.
 */

import MapCache from 'map-cache'
import { isEmpty } from 'lodash'
import createReducer from 'client/reducers/utils/createReducer'
import namespace from 'client/utils/namespaceActionsMap'
import getResourceConfig from 'shared/utils/getResourceConfig'
import cleanData from 'client/utils/cleanData'

function resourceReducer(resourceKey, state = {}) {

  const initialState = {
    cache: new MapCache(),
    entityType: undefined,
    filter: undefined,
    form: {},
    collection: {
      entities: [],
      found: 0,
      start: 0
    },
    member: {},
    query: undefined,
    page: 0,
    searchText: '',
    sort: {
      sortBy: undefined,
      sortOrder: undefined,
    },
    ...state
  }

  const actionsMap = {

    create(state, action) {
      const { cache, query } = state
      const { member, providerId } = action.payload

      cache.set(providerId, member)
      cache.del(JSON.stringify(query))

      return {
        member: {
          ...member
        },
        form: {},
        query: undefined
      }
    },

    edit(state, action) {
      const { cache, query } = state
      const { member } = action.payload

      cache.del(member.$.id)
      cache.del(JSON.stringify(query))

      return {
        member: {
          ...member
        },
        form: {},
        query: undefined
      }
    },

    filter(state, action) {
      const filter = action.payload.filter

      // Reset query if value being passed in is undefined. Right now this is
      // the way to 'unset' a query if filtering via a toggle, etc.
      const query = filter
        ? state.query
        : undefined

      return {
        filter: action.payload.filter,
        query
      }
    },

    get(state, action) {
      const { cache } = state
      const { member, providerId } = action.payload

      cache.set(providerId, member)

      return {
        member
      }
    },

    invalidateCache() {
      return {
        cache: new MapCache()
      }
    },

    invalidateQuery(state) {
      const { cache, query } = state

      cache.del(JSON.stringify(query))

      return {
        query: undefined
      }
    },

    remove(state, action) {
      const { cache, query } = state
      const { member } = action.payload

      cache.del(member.$.id)
      cache.del(JSON.stringify(query))

      return {
        form: {},
        query: undefined
      }
    },

    query(state, action) {
      return {
        query: {
          ...state.query,
          ...action.payload.query
        }
      }
    },

    search(state, action) {
      const { cache } = state
      const { collection, query } = action.payload

      // Exit
      if (isEmpty(collection)) {
        return {
          collection: initialState.collection
        }
      }

      cache.set(JSON.stringify(query), collection)

      return {
        collection,
        // page

        // FIXME: This will clear cache from removals
        // query
      }
    },

    searchText(state, action) {
      const { query } = state
      const { searchText } = action.payload

      return {
        searchText,
        query: isEmpty(searchText)
          ? undefined
          : query
      }
    },

    sort(state, action) {
      return {
        sort: {
          ...action.payload.sort
        }
      }
    },

    updateEntityType(state, action) {
      return {
        entityType: action.payload.entityType
      }
    },

    updateForm(state, action) {
      const cleanFormData = cleanData(action.payload.form)

      return {
        form: {
          ...state.form,
          ...cleanFormData
        }
      }
    }
  }

  // Namespace each reducer method by resourceKey (updateForm -> updateFormVendors),
  // so that the application can scale.
  const nsActionsMap = namespace(actionsMap, resourceKey)

  return {
    actionsMap: nsActionsMap,
    reducer: createReducer(
      resourceKey,
      nsActionsMap,
      initialState
    ),
    _initialState: initialState,
  }
}

// Build resource reducers, and validate correctness
export default function buildResourceReducers(resourceKeys) {
  return resourceKeys.reduce((reducerMap, key) => {
    const initialState = getResourceConfig(key)

    const reducer = resourceReducer(key, initialState)

    return {
      [key]: reducer,
      ...reducerMap
    }
  }, {})
}
