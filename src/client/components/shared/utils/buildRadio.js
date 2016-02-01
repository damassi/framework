import { isUndefined } from 'lodash'

export default function buildRadio(fields, prop, { condition, isDefault = false } = {}) {
  // NOTE: For use with redux-form

  const inputField = fields[prop]
  let checked = undefined

  if (isUndefined(inputField.value)) {
    checked = isDefault ? true : false
  } else {
    checked = inputField.value === condition
      ? true
      : false
  }

  return {
    ...inputField,
    checked
  }
}
