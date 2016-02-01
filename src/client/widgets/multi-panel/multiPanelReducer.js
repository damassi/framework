import { camelCase, findWhere, uniqueId } from 'lodash'
import getInitialState from 'client/widgets/multi-panel/utils/getInitialState'

export default function multiPanelReducer(state = [], action) {
  const actionsMap = {

    add(state, action) {
      const props = {
        ...action.payload,
        __panelId: Number(uniqueId())
      }

      return [
        ...state,
        {
          ...props
        }
      ]
    },

    duplicate(state, action) {
      const clone = {
        ...findWhere(state, {
          __panelId: action.payload.id
        }),
      }

      return [
        ...state,
        {
          ...clone,
          __panelId: Number(uniqueId())
        }
      ]
    },

    remove(state, action) {
      const removeId = action.payload.id

      return state.filter(item => item.__panelId !== removeId)
    },

    reset(state) {
      return getInitialState(state)
    },

    update(state, action) {
      const panelUpdateProps = action.payload
      const updateId = panelUpdateProps.__panelId

      return [
        ...state.map(panel => {
            const doUpdate = panel.__panelId === updateId
              ? panelUpdateProps
              : panel

            return doUpdate
          })
        ]
    }
  }

  const reduceFn = actionsMap[camelCase(action.type)]

  if (!reduceFn) {
    return state
  }

  return [
    ...reduceFn(state, action)
  ]
}
