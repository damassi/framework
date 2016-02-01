import deepCompact from 'deep-compact'
import { compose, get, isFunction } from 'lodash'
import { RESULTS_PER_PAGE } from 'shared/configuration'
import getResourceConfig from 'shared/utils/getResourceConfig'

export function resourceQuery(resourceKey) {
  const defaultOptions = getResourceConfig(resourceKey)

  return (request) => {
    switch (resourceKey) {

    // Create custom resourceKey elastic search queries here. See Assignment Desk for
    // a more advanced example.

    default:
      return defaultQuery(request, defaultOptions)
    }
  }
}

function defaultQuery(request, defaults) {
  const queries = compose(
    fullText,
    entityType,
    page,
    sort
  )

  return buildQuery(
    request,
    queries,
    defaults
  )
}


// Options
// --------------------------------------------------------------------------


function entityType(builder) {
  const { queryOptions, params } = builder

  builder.queryOptions = {
    ...queryOptions,
    entityType: params.options.entityType
  }

  return builder
}

function page(builder) {
  const { queryOptions, params } = builder

  builder.queryOptions = {
    ...queryOptions,
    from: params.options.page * RESULTS_PER_PAGE,
    size: RESULTS_PER_PAGE,
  }

  return builder
}

export function sort(builder) {
  const { queryOptions, params } = builder

  const {
    sortBy,
    sortOrder,
    sortMissing
  } = get(params, 'options.sort', {})

  let missing = sortMissing
  if (!missing) {
    if (sortOrder === 'asc') {
      missing = '_first'
    } else if (sortOrder === 'desc') {
      missing = '_last'
    }
  }

  builder.queryOptions = {
    ...queryOptions,
    sort: {
      [sortBy]: {
        order: sortOrder,
        missing
      }
    }
  }

  return builder
}


// Queries
// --------------------------------------------------------------------------


function fullText(builder) {
  const { query, params } = builder

  query.push({
    match_phrase_prefix: {
      _all: params.searchText
    }
  })

  return builder
}


// Utils / Helpers
// --------------------------------------------------------------------------


function setDefaults(request, defaultOptions = {}) {
  const { options } = request

  request.options = {
    page: '0',
    size: RESULTS_PER_PAGE,
    ...defaultOptions,
    ...options,
  }

  return request
}

function buildQuery(request, queries, defaultOptions = {}) {
  const queryData = setDefaults(request, defaultOptions)

  const builder = {
    query: [],
    queryOptions: {},
    params: queryData
  }

  const {
    query,
    queryOptions
  } = isFunction(queries) && queries(builder)

  const out = deepCompact({
    ...queryOptions,
    query: {
      bool: {
        must: query && query.map(field => {
          return {
            ...field
          }
        })
      }
    }
  })

  if (window.__LOGGING_ENABLED__ || __DEV__) {
    console.log('\n') /* eslint no-console: 0 */

    console.warn(
      '(client/utils/search/searchApi.js) \n\n' +
      'Query: \n\n', JSON.stringify(out)
    )
  }

  return out
}
