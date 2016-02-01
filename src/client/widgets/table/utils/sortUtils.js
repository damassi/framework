import { get, sortByOrder } from 'lodash'

export function sortByFriendlyId(item) {
  const id = get(item, 'assignment_friendly_id', '').substr(3)
  return Number(id)
}

export function sortByName(item) {
  return get(item, '$name', '').toUpperCase()
}

// FIXME: Invariant
export function sortOrder(prop) {
  return (data, sortOrder) => {
    return sortByOrder(data, (item) => {
      const strippedProp = prop.replace('.insensitive', '')
      return get(item, strippedProp, '') .toUpperCase()
    }, sortOrder)
  }
}
