/**
 * Clean form data before it is saved to the DAM. Note that values that previous existed,
 * when set to undefined or an empty string, will be remove from the backend. This should
 * only be used at the reducer level, just before new `updateForm` form state is returned.
 *
 * NOTE: This can probably be simplified via a library from NPM.
 */

import _, {
  cloneDeep,
  isArray,
  isEmpty,
  isString
} from 'lodash'

_.mixin(require('lodash-deep'))

export default function cleanData(data) {
  const out = _.deepMapValues(cloneDeep(data), (value) => {
    let out = value

    if (!isEmpty(out) && isString(out)) {
      out = out.trim()
    }

    if (out === '') {
      out = undefined
    }

    return out
  })

  // Set empty arrays to undefined
  Object.keys(out).forEach((value) => {
    const prop = out[value]
    if (isArray(prop) && isEmpty(prop)) {
      out[value] = undefined
    }
  })

  return out
}
