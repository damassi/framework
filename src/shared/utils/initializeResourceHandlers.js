/**
 * Iterates over each resource on both the client (actions) and the
 * server (route handlers) and calls their init method, returning
 * a map of ready-to-use functions, e.g.,
 */

import { reduce } from 'lodash'

export default function initializeResourceHandlers(handlers, ...rest) {
  return reduce(handlers, (handlerMap, handler, key) => {
    return {
      [key]: handler(...rest),
      ...handlerMap
    }
  }, {})
}
