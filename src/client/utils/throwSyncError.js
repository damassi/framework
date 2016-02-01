/**
 * Fixes asynchronous error handling by exiting the promise chain, allowing you to track
 * down exactly where the error was thrown with a clean stack trace.
 */

import Observable from 'observ'
import { isEqual } from 'lodash'

let prevError = {}

export default function throwSyncError(msg, error) {
  /* eslint no-console: 0 */

  if (!__TEST__) {
    console.log(`\n (${msg})`)
  }

  if (isEqual(prevError, error)) {
    return
  }

  if (error instanceof Error) {
    setTimeout(() => {
      errorNotifications.set(error)
      throw error
    })
  } else {
    errorNotifications.set(error)

    if (!__TEST__) {
      console.error(error)
    }
  }

  prevError = error
}

export const errorNotifications = Observable()
