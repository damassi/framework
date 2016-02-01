import { isObject } from 'lodash'
import { get } from 'lodash'
import invariant from 'invariant'
import dam from 'ape-dam-entity-client'
import uuid from 'node-uuid'
import { incrementAndGet } from 'server/utils/atomicCounter'

import { cacheOptions } from 'shared/configuration'

const {
  server: {
    enabled: cacheEnabled
  }
} = cacheOptions

export default function initialize(cache) {

  /**
   * POST /vendors/create
   *
   * @param  {props}  req.params
   */
  return async function create(req, res, next) {
    const newProps = req.params

    try {
      invariant(isObject(req.params),
        '(Server: create.js) \n' +
        'Error creating entity: `req.params` is undefined.'
      )

      const entityType = get(req.params, '$type[0].$id', '')

      if (entityType === 'type/photoAssignment') {
        const brand = await dam.getEntity('ti', newProps.photoAssignment_publication.$id, 'test_user', '')
        const idPrefix = brand.title_abbreviation ? brand.title_abbreviation : brand.$name
        const counterName = newProps.$type[0].$id + '/title/' + newProps.photoAssignment_publication.$id
        const counterValue = await incrementAndGet(counterName)
        newProps.assignment_friendly_id = `${idPrefix}-${counterValue}`
      }

      req.log.debug('\n(server/create.js): Params: \n', { newProps }, '\n')

      const response = await dam.updateEntity('dam', uuid.v1(), newProps, 'test_user')

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
