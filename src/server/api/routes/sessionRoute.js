import authenticateUser from 'server/utils/authenticate'
import log from 'server/utils/log'

export default function initialize(server) {

  server.post('/login', async (req, res, next) => {
    const { username, password } = req.params

    try {
      const response = await authenticateUser(username, password)

      if (!response.token) {
        req.damFramework.error = 'Authentication Failed.'
        log.error({
          err: req.damFramework.error
        }, req.damFramework.error)

        // TODO: Might want to update this to be more robust; simply passing errors
        // over to the other side right now.
        return res.send({
          ...response
        })
      }

      /* eslint no-console: 0 */
      console.log('Authentication Successful.  User: ' + response.user.displayName)
      req.damFramework.authToken = response.token

      res.send({
        ...response
      })
    } catch (err) {
      res.log.error({ err })
      return next(err)
    }

    return next()
  })

  server.get('/logout', (req, res, next) => {
    delete req.damFramework.authToken
    req.damFramework.reset()

    res.send({
      success: true
    })

    return next()
  })

  server.get('/is-logged-in', (req, res, next) => {
    const loginStatus = req.damFramework && !req.damFramework.error
      ? { loggedIn: true }
      : { error: req.damFramework.error }

    res.send(loginStatus)
    return next()
  })

  server.get('/authenticate', (req, res, next) => {
    function unauthorized(res) {
      req.damFramework.loginSource = req.url

      res.send({
        errorMessage: 'Error authenticating route: Unauthorized',
        loginSource: req.url
      })
    }

    if (req.damFramework === null || req.damFramework.authToken === null) {
      return unauthorized(res)
    }

    return next()
  })
}
