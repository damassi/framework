import dam from 'ape-dam-entity-client'
import invariant from 'invariant'
import { isUndefined } from 'lodash'
import { cacheOptions } from 'shared/configuration'
import getSchema from 'server/schemas'

const {
  server: {
    enabled: cacheEnabled
  }
} = cacheOptions

export default function initialize(cache) {

  /**
   * GET /vendors/2f70d3b99780814760d2dcfaa90e6e3e
   *
   * @param  {String}   req.params.providerId
   * @param  {String}   req.params.entityType
   * @return {Object}
   */
  return async function get(req, res, next) {
    const { entityType, providerId } = req.params

    try {
      invariant(providerId,
        '(Server: get.js) \n' +
        'Error getting entity: `req.params.providerId` is undefined.'
      )

      invariant(entityType,
        '(Server: get.js) \n' +
        'Error getting entity: `req.params.entityType` is undefined.'
      )

      req.log.debug('\n(server/get.js): Params: \n', {
        providerId,
        entityType
      }, '\n')

      const cached = cacheEnabled && cache.get(providerId)

      if (cacheEnabled && cached) { res.send(cached) } else {
        try {
          const schemaTypes = await getSchema()
          const schema = schemaTypes[entityType] || {}

          // TODO:
          // Should we let this pass by? Should we force developers to add a schema entry
          // rather than passing it through as an empty object?

          if (isUndefined(schemaTypes[entityType])) {
            /* eslint no-console: 0 */

            req.log.error(
              '\n(server/api/resources/get.js) \n' +
              `WARNING: schema for ${entityType} not found. Did you remember ` +
              'to add it to `server/schemas/index.js`?'
            )
          }

          const response = await dam.getEntity('ti', providerId, 'test_user', schema)

          let out = undefined
          if (cacheEnabled) {
            cache.set(providerId, response)
            out = cache.get(providerId)
          } else {
            out = response
          }

          res.send(out)
        } catch (err) {
          res.log.error({ err })
          return next(err)
        }
      }
    } catch (err) {
      res.log.error({ err })
      return next(err)
    }

    return next()
  }
}
