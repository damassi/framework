import createReducer from 'client/reducers/utils/createReducer'

const initialState = {
  activeBrand: {},
  displayName: '',
  email: '',
  loggedIn: false,
  token: false
}

const actionsMap = {

  loginSuccess(state, action) {
    const {
      token,
      user: {
        displayName,
        email
      }
    } = action.payload

    return {
      displayName,
      email,
      loggedIn: true,
      token
    }
  },

  loginError(state, action) {
    const { statusText } = action.payload.error

    return {
      loggedIn: false,
      errorStatusText: statusText
    }
  },

  logout() {
    return initialState
  },

  restore(state, action) {
    return {
      ...action.payload
    }
  }

}

export default {
  actionsMap,
  reducer: createReducer('session', actionsMap, initialState)
}

export const _initialState = initialState
