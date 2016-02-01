import dam from 'ape-dam-entity-client'
import invariant from 'invariant'
import { isObject } from 'lodash'
import { cacheOptions } from 'shared/configuration'

const {
  server: {
    enabled: cacheEnabled
  }
} = cacheOptions

export default function initialize(cache) {

  /**
   * POST /vendors/2f70d3b99780814760d2dcfaa90e6e3e/edit
   *
   * @param  {String}   req.params.providerId
   * @param  {String}   req.params.newProps
   * @return {Object}
   */
  return async function edit(req, res, next) {
    const { provider, providerId, updateProps } = req.params

    try {
      invariant(providerId,
        '(Server: edit.js) \n' +
        'Error editing entity: `req.params.providerId` is undefined.'
      )

      invariant(updateProps && isObject(updateProps),
        '(Server: edit.js) \n' +
        'Error editing entity; a `req.params.updateProps` is required.'
      )

      req.log.debug('\n(server/edit.js): Params: \n', {
        provider,
        providerId,
        updateProps,
      }, '\n')

      const response = await dam.updateEntity(provider, providerId, updateProps, 'test_user')

      let out = undefined
      if (cacheEnabled) {
        const id = response.$.id
        cache.set(id, response)
        out = cache.get(id)
      } else {
        out = response
      }

      res.send(out)
    } catch (err) {
      res.log.error({ err })
      return next(err)
    }

    return next()
  }
}
