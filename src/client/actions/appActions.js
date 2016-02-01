/**
 * App-wide actions should go here. Similar to what is shown below, only super generic,
 * global action types are appropriate.
 */

import * as types from 'client/constants/appActionTypes'

export function showPreloader(statusMsg) {
  return {
    type: types.SHOW_PRELOADER,
    payload: {
      statusMsg
    }
  }
}

export function hidePreloader() {
  return {
    type: types.HIDE_PRELOADER
  }
}

export function showSearchPreloader(show) {
  return {
    type: types.SHOW_SEARCH_PRELOADER,
    payload: {
      show
    }
  }
}

export function showError(error) {
  return {
    type: types.SHOW_ERROR,
    payload: {
      error
    }
  }
}
