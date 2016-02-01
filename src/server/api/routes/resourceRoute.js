import NodeCache from 'node-cache'
import invariant from 'invariant'
import { isString } from 'lodash'
import createResourceHandlers from 'server/api/routes/resource/utils/createResourceHandlers'
import { cacheOptions } from 'shared/configuration'

export default function initializeResourceRoute({ resourceKey, entityType, server }) {

  invariant(resourceKey && isString(resourceKey),
    'Error configuring resource route: a valid `resourceKey` is required.'
  )

  invariant(entityType && isString(entityType),
    'Error configuring resource route: a valid `entityType` is required.'
  )

  invariant(server,
    'Error configuring resource route: a Restify `server` instance is required.'
  )

  const cache = new NodeCache(cacheOptions.server)

  const {
    create,
    edit,
    get,
    remove,
  } = createResourceHandlers(cache, entityType, resourceKey)

  server.post(`/${resourceKey}/create`, create)
  server.post(`/${resourceKey}/:providerId/edit`, edit)
  server.get(`/${resourceKey}/:providerId`, get)
  server.del(`/${resourceKey}/:providerId`, remove)
}
