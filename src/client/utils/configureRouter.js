/**
 * Configure the history lib to be used with react-router and redux-simple-router. Query
 * configuration is due to react-router not automatically parsing complex, nested query data.
 */

import qs from 'qs'
import { useRouterHistory } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

export default function configureRouter() {
  const createHistory = useRouterHistory(createBrowserHistory)

  const history = createHistory({
    stringifyQuery: (query) => {
      return qs
        .stringify(query, { arrayFormat: 'brackets' })
        .replace(/%20/g, '+')
    },

    parseQueryString: (queryString) => {
      return qs.parse(queryString.replace(/\+/g, '%20'))
    }
  })

  return history
}
