import Pretender from 'pretender'
import thunk from 'redux-thunk'
import configureStore from 'client/utils/helpers/mockStore'
import * as sessionActions from 'client/actions/sessionActions'
import * as sessionActionTypes from 'client/constants/sessionActionTypes'

describe('(client/actions/sessionActions.js)', () => {
  let server = undefined

  beforeEach(() => {
    server = new Pretender()
  })

  afterEach(() => {
    server.shutdown()
  })

  it('#login() API calls', (done) => {
    server.post('/api/login', () => {
      return [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({
          statusCode: 200,
          session: {
            roles: ['test_usr']
          },
          token: {},
          user: {}
        })
      ]
    })

    const mockStore = configureStore([thunk])

    const actions = [
      {
        type: sessionActionTypes.LOGIN_SUCCESS,
        payload: {
          token: {},
          user: {},
        }
      },
    ]

    const store = mockStore({}, actions, done, { logActions: false })
    store.dispatch(sessionActions.login('username', 'password'))
  })

  it('#login() admin role rights', (done) => {
    server.post('/api/login', () => {
      return [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({
          statusCode: 200,
          session: {
            roles: [
              'test_usr',
              'contracts_admin'
            ]
          },
          token: {},
          user: {}
        })
      ]
    })

    const mockStore = configureStore([thunk])

    const actions = [
      {
        type: sessionActionTypes.LOGIN_SUCCESS,
        payload: {
          token: {},
          user: {},
        }
      },
    ]

    const store = mockStore({}, actions, done, { logActions: false })
    store.dispatch(sessionActions.login('username', 'password'))
  })

  it('#login() should return an error message if incorrect credentials', (done) => {
    server.post('/api/login', () => {
      return [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({
          statusCode: 401
        })
      ]
    })

    const mockStore = configureStore([thunk])

    const actions = [{
      type: sessionActionTypes.LOGIN_ERROR,
      payload: {
        error: {
          statusText: 'Please check your username or password'
        }
      }
    }]

    const store = mockStore({}, actions, done, { logActions: false })
    store.dispatch(sessionActions.login('username', 'password'))
  })

  it('#logout() API calls', (done) => {
    server.get('/api/logout', () => {
      return [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({
          success: true
        })
      ]
    })

    const mockStore = configureStore([thunk])
    const store = mockStore({}, [{ type: sessionActionTypes.LOGOUT }], done, { logActions: false })
    store.dispatch(sessionActions.logout())
  })
})
