export const ADMIN_PORT = 8081
export const API_PORT = 8090
export const PORT = 8080

export const RESULTS_PER_PAGE = 25

export const logging = {
  client: {
    enabled: true
  }
}

export const cacheOptions = {
  client: {
    enabled: true
  },
  server: {
    enabled: false,

    // In seconds, 0 is unlimited
    stdTTL: 1,

    // In seconds, 0 is unlimited
    checkperiod: 0
  }
}

export const persistentCacheOptions = {
  sessionCookie: {
    name: 'exampleDAMApp',
    options: {
      maxAge: 500000,
      path: '/'
    }
  }
}

export const resources = [
  {
    initialState: {
      resourceKey: 'example',
      entityType: 'testEntityType',
      provider: 'dam',

      sort: {
        sortBy: '$.created',
        sortOrder: 'desc'
      }
    },
  }
]
