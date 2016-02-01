import { isArray } from 'lodash'

export function serializeSelectValues(arr) {
  return isArray(arr) && arr.map(v => {
    return {
      $id: v.value
    }
  })
}

export function deserializeSelectValues(arr) {
  return isArray(arr) && arr.map(v => {
    return {
      label: v.$name,
      value: v.$id
    }
  })
}
