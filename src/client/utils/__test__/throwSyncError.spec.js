import throwSyncError, { errorNotifications } from 'client/utils/throwSyncError'

describe('(client/utils/throwSyncError.js)', () => {
  it('should dispatch errors', (done) => {
    errorNotifications(done)
    throwSyncError('foo')
  })
})
