/* eslint no-unused-vars: 0 */

import Pretender from 'pretender'
import thunk from 'redux-thunk'
import initGet from 'client/actions/resource/get'
import configureStore from 'client/utils/helpers/mockStore'

describe('(client/actions/resource/get.js)', () => {
  const PAYLOAD = '1'

  const RESPONSE = {
    $: {
      id: 0
    },
    $name: 'Chris'
  }

  let server = undefined

  beforeEach(() => {
    server = new Pretender(function fetch() {
      this.get('/api/test/1', () => {
        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify(RESPONSE)
        ]
      })
    })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('Should dispatch `get` API calls', (done) => {
    const mockStore = configureStore([thunk])
    const actionType = 'GET_TEST'
    const action = initGet('test', { GET: actionType })

    const actions = [
      {
        type: actionType,
        payload: {
          member: {
            ...RESPONSE
          },
          providerId: PAYLOAD
        }
      },
    ]

    const initialState = {
      test: {
        cache: {
          has: () => false
        }
      }
    }

    const store = mockStore(initialState, actions, done, { logActions: false })
    store.dispatch(action(PAYLOAD))
  })
})
