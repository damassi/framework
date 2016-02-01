import React from 'react'
import { Route, Redirect } from 'react-router'
import ListView from 'client/components/resources/example/ListView'
import Create from 'client/components/resources/example/Create'
import ItemView from 'client/components/resources/example/ItemView'
import Edit from 'client/components/resources/example/Edit'

export default (
  <Route>
    <Route path='example/page/:page' component={ListView} />
    <Route path='example/create' component={Create} />
    <Route path='example/:providerId' component={ItemView} />
    <Route path='example/:providerId/edit' component={Edit} />
    <Redirect from='example' to='example/page/0' />
  </Route>
)
