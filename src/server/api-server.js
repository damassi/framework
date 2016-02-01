import restify from 'restify'
import sessions from 'client-sessions'
import { start as initalizePrettyErrors } from 'pretty-error'
import initializeApiRoutes from 'server/api'
import log from 'server/utils/log'
import { API_PORT, resources } from 'shared/configuration'

const server = restify.createServer({
  name: 'api-server',
  version: '0.1.0',
  log
})

server.pre(restify.pre.sanitizePath())
server.pre(restify.pre.userAgentConnection())
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.fullResponse())
server.use(restify.requestLogger(log))

server.use(sessions({
  cookieName: 'damFramework',
  secret: 'dam-edit-framework-www',
  duration: 365 * 24 * 60 * 60 * 1000,
  activeDuration: 1000 * 60 * 5
}))

server.pre((req, res, next) => {
  req.log.info({ req }, '\n(REQUEST)')
  next()
})

server.on('after', (req, res) => {
  req.log.info({ res }, '\n(RESPONSE)')
})

initalizePrettyErrors()
initializeApiRoutes(server, resources)

server.listen(API_PORT, () => {
  /* eslint no-console: 0 */
  console.log(`${server.name} listening at ${server.url}`)
})
