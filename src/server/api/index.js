import { isFunction } from 'lodash'
import createResourceRoutes from 'server/api/routes/resource/utils/createResourceRoutes'

export default function initializeApiRoutes(server, resources) {
  const apiRoutes = [
    createResourceRoutes(resources),

    require('./routes/sessionRoute').default,
    require('./routes/s3Route').default,
    require('./routes/searchRoute').default,
    require('./routes/testRoute').default
  ]

  apiRoutes.forEach(
    (initialize) => {
      if (!isFunction(initialize)) {
        throw new Error('Error mounting API routes: an `initialize` function is required.')
      }

      initialize(server)
    }
  )
}
