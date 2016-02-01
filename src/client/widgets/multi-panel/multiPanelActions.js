import invariant from 'invariant'
import { isUndefined } from 'lodash'
import * as types from 'client/widgets/multi-panel/multiPanelActionTypes'

export function add(props) {
  invariant(props,
    '(multiPanelActions.js) \n' +
    'Error adding <MultiPanel />: `props` is undefined.'
  )

  return {
    type: types.ADD,
    payload: {
      ...props
    }
  }
}

export function duplicate(id) {
  invariant(!isUndefined(id),
    '(multiPanelActions.js) \n' +
    'Error duplicating <MultiPanel />: `id` is undefined.'
  )

  return {
    type: types.DUPLICATE,
    payload: {
      id
    }
  }
}

export function remove(id) {
  invariant(!isUndefined(id),
    '(multiPanelActions.js) \n' +
    'Error removing <MultiPanel />: `id` is undefined.'
  )

  return {
    type: types.REMOVE,
    payload: {
      id
    }
  }
}

export function reset() {
  return {
    type: types.RESET
  }
}

export function update(id, props) {
  invariant(!isUndefined(id),
    '(multiPanelActions.js) \n' +
    'Error updating <MultiPanel />: `id` is undefined.'
  )

  invariant(props,
    '(multiPanelActions.js) \n' +
    'Error updating <MultiPanel />: `props` is undefined.'
  )

  return {
    type: types.UPDATE,
    payload: {
      ...props,
      __panelId: id
    }
  }
}
