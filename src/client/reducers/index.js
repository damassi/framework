import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routeReducer } from 'redux-simple-router'
import getResourceKeys from 'client/utils/getResourceKeys'
import buildResourceReducers from 'client/reducers/resourceReducer'
import app from 'client/reducers/appReducer'
import session from 'client/reducers/sessionReducer'

// Internal, application specific reducers go here. Note that app-specific reducers are
// different than resource reducers, which are related to the framework as a whole. If
// you need to add a new category of functionality, follow the examples set within
// `app` or `session` below, and add it to the `appReducers` object.

export const appReducers = {
  app,
  session
}

// External, Redux library related reducers go here
const externalReducers = {
  form: formReducer,
  routing: routeReducer
}

// Framework / resourceReducers are created
export const resourceReducers = {
  ...buildResourceReducers(getResourceKeys())
}

const appStateReducers = {
  ...appReducers,
  ...resourceReducers
}

// Dynamcally create reducers. We're doing this so that we can validate that actions
// correspond to reducer methods which correspond to ACTION_TYPES.
const internalReducers = Object
  .keys(appStateReducers)
  .reduce((reducerMap, key) => ({
    [key]: appStateReducers[key].reducer,
    ...reducerMap
  }), {})

// Export all combined reducers together here for Redux to initialize with.
export default combineReducers({
  ...externalReducers,
  ...internalReducers
})
