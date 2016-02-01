/**
 * Middleware for triggering display of crashes and errors. At some point this could be
 * hooked up to a reporting service. See AppShell.js for where errors are displayed.
 */

import throwSyncError from 'client/utils/throwSyncError'

export default function crashReporter() {
  return next => action => {
    try {
      return next(action)
    } catch (error) {
      throwSyncError('Caught exception: ', error)
    }
  }
}
