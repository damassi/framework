require('babel-polyfill')
require('babel-core/register')({
  presets: [
    'es2015',
    'stage-0'
  ]
})

const linkPackage = require('link-package')
const config = require('ape-config')
const dam = require('ape-dam-entity-client')
const log = require('./src/server/utils/log').default

const entityEndpoint = config.get('ENTITY_SERVICE_URL', 'https://prod-entitysvc.timeincapp.com')
const searchEndpoint = config.get('CLOUD_SEARCH_URL', 'search-entity-service-test-1-rsjmbphcllhyfwsph2oihkzeey.us-east-1.cloudsearch.amazonaws.com')
const esEndpoint = config.get('ELASTICSEARCH_URL', 'https://search-dam-ecs-prod-gxjtqeg6mlialmiianhb6cexoy.us-east-1.es.amazonaws.com')

dam.setEndpoints(entityEndpoint, searchEndpoint, esEndpoint)

// Enables absolute import paths on the server
linkPackage('src/server', 'server')
linkPackage('src/shared', 'shared')

// API
require('./src/server/api-server')

// Application
if (config.env === 'dev') {
  require('./src/server/dev-server')
} else {
  require('./src/server/prod-server')
}

log.debug(config.get())

console.log('Entity Service Endpoint: ' + dam.getEntityEndpoint())
console.log('Cloud Search Endpoint: ' + dam.getSearchEndpoint())
console.log('Elasticsearch Endpoint: ' + dam.esEndpoint)
