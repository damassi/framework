import http from 'axios'
import { isString } from 'lodash'
import throwSyncError from 'client/utils/throwSyncError'

export function fetchPhotographers({ active, onFetch }) {
  const query = (input) => ({
    from: 0,
    size: 25,
    sort: {
      '$name.case_insensitive': {
        order: 'asc'
      }
    },
    query: {
      bool: {
        must: [
          {
            match: {
              'vendor_type.vendor_type': 'Photographer'
            }
          },
          {
            match_phrase_prefix: {
              _all: input
            }
          }
        ]
      }
    }
  })

  return fetch({
    entityType: 'person_vendor,agency_vendor',
    active,
    onFetch,
    query,
  })
}


// ------------------------------------------------------------


function fetch({
  entityType,
  query,
  resourceKey,
  active = false,
  transform = (x) => x
}) {

  return async (input) => {

    // Exit
    if (!isString(input) || !active) {
      Promise.resolve({ options: [] })
    }

    try {
      const searchQuery = await query(input)

      if (window.__LOGGING_ENABLED__ || __DEV__) {
        console.log('\n') /* eslint no-console: 0 */

        console.warn(
          '(client/components/shared/utils/fetch.js) \n\n',
          'entityType: ', entityType,
          'resourceKey: ', resourceKey,

          'Query: \n\n',
          JSON.stringify(searchQuery)
        )
      }

      const results = await http.post('/api/search', {
        entityType,
        query: searchQuery,
        resourceKey
      })

      const transformedResults = transform(results.data.entities)

      const data = transformedResults && transformedResults.map(item => ({
        label: item.$name,
        value: item.$.id,
        ...item
      })) || []

      return {
        options: data
      }
    } catch (error) {
      throwSyncError('components/shared/utils/fetch.js', error)
    }
  }
}
