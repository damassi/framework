import dam from 'ape-dam-entity-client'
import invariant from 'invariant'
import { isObject, isUndefined } from 'lodash'
import getSchema from 'server/schemas'
import getEntityType from 'shared/utils/getEntityType'

export default function initialize(server) {

  /**
   * POST /search
   *
   * @param  {Object}   req.params.query
   * @param  {String}   req.params.resourceKey
   */
  server.post('/search', async (req, res, next) => {
    const {
      entityType,
      query,
      resourceKey
    } = req.params

    try {
      invariant(query && isObject(query),
        '\n(server/api/searchRoute.js) \n' +
        'Error searching: `query` is undefined.'
      )

      let searchType = entityType

      if (!searchType) {
        invariant(resourceKey,
          '\n(server/api/searchRoute.js) \n' +
          'Error searching: `resourceKey` is undefined.'
        )

        searchType = getEntityType(resourceKey)
      }

      const schemaTypes = await getSchema()
      const schema = schemaTypes[searchType] || {}

      // TODO:
      // Should we let this pass by? Should we force developers to add a schema entry
      // rather than passing it through as an empty object?

      if (isUndefined(schemaTypes[searchType])) {
        /* eslint no-console: 0 */

        req.log.error(
          '\n(server/api/searchRoute.js) \n' +
          `WARNING: schema for ${searchType} not found. Did you remember ` +
          'to add it to `server/schemas/index.js`?'
        )
      }

      req.log.debug('\n(server/api/searchRoute.js): ElasticSearch query params: \n',
        `entityType: ${searchType} \n`,
        `schema: ${schema} \n\n`,
        JSON.stringify(query),
        '\n'
      )

      const results = await dam.esSearch(searchType, query, schema)
      results.start = query.from || 0

      res.send(results)
    } catch (err) {
      res.log.error({ err })
      res.send(err)
      return next(err)
    }

    return next()
  })
}
