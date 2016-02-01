/**
 * Create all system-level actions. This file should never be touched; rather, when
 * creating new framework-related actions be sure to add them to the compose fn in
 * actions/resource/utils/createResourceActions.js which packages everything together.
 */

import build from 'client/actions/resource/utils/buildResourceActions'
import namespace from 'client/utils/namespaceActionsMap'
import createActionTypes from 'client/constants/resourceActionTypes'
import createActions from 'client/actions/resource/utils/createResourceActions'
import getResourceKeys from 'client/utils/getResourceKeys'

function resourceActionsMap(resourceKey) {
  const actionTypes = createActionTypes(resourceKey)

  const actionsMap = createActions(
    resourceKey,
    actionTypes
  )

  return namespace(actionsMap, resourceKey)
}

const resourceActions = {
  ...build(resourceActionsMap, getResourceKeys())
}

export default resourceActions
