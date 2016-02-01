import React from 'react'
import { Route } from 'react-router'
import AppShell from 'client/components/AppShell'
import AppContainer from 'client/components/AppContainer'
import Error404 from 'client/components/shared/error-pages/Error404'
import SystemError from 'client/components/shared/error-pages/SystemError'

import ExampleRoutes from 'client/components/resources/example'

import Login from 'client/components/login/Login'
import Logout from 'client/components/login/Logout'


// TODO:
//
// Might  want to organize this better within react-router so we don't have to
// hard-code paths after login, on logo click, etc.
export const DEFAULT_ROUTE = '/example'


export default (
  <Route component={AppShell}>
    <Route path='/' component={Login} />
    <Route path='login' component={Login} />
    <Route path='logout' component={Logout} />

    <Route component={AppContainer}>
      {ExampleRoutes}
    </Route>

    <Route path='system-error' component={SystemError}/>
    <Route path='*' component={Error404}/>
  </Route>
)
