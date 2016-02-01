import Pretender from 'pretender'
import thunk from 'redux-thunk'
import initEdit from 'client/actions/resource/edit'
import configureStore from 'client/utils/helpers/mockStore'

describe('(client/actions/resource/edit.js)', () => {
  const PAYLOAD = {
    $: {
      id: 0,
      providers: {
        dam: '222'
      }
    },
    $name: 'Chris'
  }

  let server = undefined

  beforeEach(() => {
    server = new Pretender(function fetch() {
      this.post('/api/assignments/1/edit', () => {
        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify(PAYLOAD)
        ]
      })

      this.post('/api/workflow-signal', () => {
        return [200]
      })
    })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('Should dispatch `edit` API calls', (done) => {
    const mockStore = configureStore([thunk])
    const actionType = 'EDIT_ASSIGNMENTS'
    const action = initEdit('assignments', { EDIT: actionType })

    const actions = [
      {
        type: actionType,
        payload: {
          member: {
            ...PAYLOAD
          }
        }
      },
    ]

    const store = mockStore({}, actions, done)
    store.dispatch(action('dam', '1', PAYLOAD))
  })
})
