import http from 'axios'
import apeConfig from 'ape-config'
import log from 'server/utils/log'

export default async function authenticate(username, password) {
  const usernameToLowerCase = username.toLowerCase()

  const USER_SERVICE_URL = apeConfig.get('USER_SERVICE_URL', 'http://usersvc.dam.timeincapp.com')

  try {
    const authorize = await http.get(USER_SERVICE_URL, {
      headers: {
        Authorization: 'Basic ' + new Buffer(usernameToLowerCase + ':' + password).toString('base64')
      }
    })

    const token = await http.get(USER_SERVICE_URL, {
      headers: {
        Authorization: `Bearer ${authorize.data.refreshToken}`
      }
    })

    return {
      statusCode: 200,
      token: token.data,
      session: authorize.data,
      user: authorize.data.details
    }

  } catch (err) {

    // Invalid credentials
    if (err.status === 401) {
      log.error({ err }, 'Invalid Credentials')

      return {
        statusCode: 401,
        error: {
          ...err
        }
      }
    }

    log.error({ err }, 'Error logging in')
  }
}
