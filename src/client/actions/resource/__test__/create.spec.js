import Pretender from 'pretender'
import thunk from 'redux-thunk'
import initCreate from 'client/actions/resource/create'
import configureStore from 'client/utils/helpers/mockStore'

describe('(client/actions/resource/create.js)', () => {
  const PAYLOAD = {
    $: {
      id: 0
    },
    $name: 'Chris'
  }

  let server = undefined

  beforeEach(() => {
    server = new Pretender(function fetch() {
      this.post('/api/assignments/create', () => {
        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify(PAYLOAD)
        ]
      })

      this.post('/api/workflow-create', () => {
        return [200]
      })
    })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should dispatch `create` API calls', (done) => {
    const mockStore = configureStore([thunk])
    const actionType = 'CREATE_ASSIGNMENTS'
    const create = initCreate('assignments', { CREATE: actionType })

    const actions = [
      {
        type: actionType,
        payload: {
          member: {
            ...PAYLOAD,
          },
          providerId: PAYLOAD.$.id
        }
      },
    ]

    const store = mockStore({}, actions, done)
    store.dispatch(create(PAYLOAD))
  })
})
