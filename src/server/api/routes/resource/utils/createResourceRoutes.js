import initializeResourceRoute from 'server/api/routes/resourceRoute'

export default function initializeResourceRoutes(resourceConfigs) {
  return (server) => {
    resourceConfigs.forEach(
      (config) => initializeResourceRoute({
        ...config.initialState,
        server
      })
    )
  }
}
