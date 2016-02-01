import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { mixin } from 'lodash'
import lodashDeep from 'lodash-deep'
import { syncReduxAndRouter } from 'redux-simple-router'
import App from 'client/App'
import mountConsoleLogger from 'client/utils/consoleLogger'
import configureStore from 'client/utils/configureStore'
import configureRouter from 'client/utils/configureRouter'

mixin(lodashDeep)
mountConsoleLogger()

const store = configureStore()
const history = configureRouter()

syncReduxAndRouter(history, store)

ReactDOM.render(
  <App
    history={history}
    store={store}
  />
, document.getElementById('root'))
