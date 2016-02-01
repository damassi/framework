import dam from 'ape-dam-entity-client'
import invariant from 'invariant'
import { cacheOptions } from 'shared/configuration'

const {
  server: {
    enabled: cacheEnabled
  }
} = cacheOptions

export default function initialize(cache) {

  /**
   * DELETE /vendors/2f70d3b99780814760d2dcfaa90e6e3e
   *
   * @param  {String}   req.params.providerId
   * @return {Object}
   */
  return async function remove(req, res, next) {
    const providerId = req.params.providerId

    try {
      invariant(providerId,
        '(Server: resource/remove.js) \n' +
        'Error removing entity: `req.params.providerId` is undefined.'
      )

      req.log.debug('\n(server/remove.js): Params: \n', { providerId }, '\n')

      const response = await dam.deleteEntity('dam', providerId, 'test_user')

      if (cacheEnabled) {
        const id = response.$.id

        if (cache.get(id)) {
          cache.del(id)
        }
      }

      res.send(response)
    } catch (err) {
      res.log.error({ err })
      return next(err)
    }

    return next()
  }
}
