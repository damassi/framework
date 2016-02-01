import deepCompact from 'deep-compact'
import invariant from 'invariant'

import {
  cloneDeep,
  isArray,
  isEmpty,
  isObject,
  isString,
  isUndefined,
  memoize
} from 'lodash'

const exportMultiPanel = memoize((formData, multiPanels) => {

  invariant(formData && isObject(formData),
    'Error exporting <MultiPanel /> data: A `formData` object is required.'
  )

  invariant(multiPanels && (isString(multiPanels) || isArray(multiPanels)),
    'Error exporting <MultiPanel /> data: An array of `multiPanel` key names is required.'
  )

  if (isString(multiPanels)) {
    /* eslint no-param-reassign: 0 */

    multiPanels = [multiPanels]
  }

  // Iterate over all panels
  const out = multiPanels.reduce((newForm, panelName) => {
    let multiPanel = newForm[panelName]


    if (isUndefined(multiPanel)) {
      return newForm
    }

    // Remove panel ids
    if (isArray(multiPanel)) {
      multiPanel.forEach(form => delete form.__panelId)
    }

    // Remove empty values
    multiPanel = deepCompact(multiPanel)

    // Delete panelName if empty, or pass along cleaned values
    if (isEmpty(multiPanel)) {
      newForm[panelName] = undefined
    } else {
      newForm[panelName] = multiPanel
    }

    return newForm
  }, cloneDeep(formData))

  return out
}, (x) => JSON.stringify(x))

export default exportMultiPanel
