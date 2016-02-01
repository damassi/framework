import createReducer from 'client/reducers/utils/createReducer'

const initialState = {
  error: {
    message: undefined,
    stack: undefined
  },
  showErrorModal: false,
  showPreloader: false,
  showSearchPreloader: false,
  statusMsg: undefined
}

const actionsMap = {

  showError(state, action) {
    return {
      error: action.payload.error,
      handleSystemError: true
    }
  },

  showPreloader(state, action) {
    const { statusMsg } = action.payload

    return {
      showPreloader: true,
      statusMsg
    }
  },

  hidePreloader() {
    return {
      showPreloader: false
    }
  },

  // FIXME: We don't need this anymore since we're using the main loader instead.
  showSearchPreloader(state, action) {
    const { show } = action.payload

    return {
      showSearchPreloader: show
    }
  }

}

export default {
  actionsMap,
  reducer: createReducer('app', actionsMap, initialState)
}

export const _initialState = initialState
