/* eslint no-unused-vars: 0 */

import Pretender from 'pretender'
import thunk from 'redux-thunk'
import initGet from 'client/actions/resource/remove'
import configureStore from 'client/utils/helpers/mockStore'

describe('TODO (client/actions/resource/remove.js)', () => {
  const PAYLOAD = '1'

  const RESPONSE = {
    $: {
      id: PAYLOAD
    }
  }

  let server = undefined

  beforeEach(() => {
    server = new Pretender(function fetch() {
      this.delete('/api/test/1', () => {
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

  it('Should dispatch `remove` API calls', (done) => {
    const mockStore = configureStore([thunk])
    const actionType = 'REMOVE_TEST'
    const action = initGet('test', { REMOVE: actionType })

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
