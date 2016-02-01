import { isArray, findWhere, head } from 'lodash'

export default function getPrimary(info) {
  if (!isArray(info)) {
    return false
  }

  const primary = findWhere(info, {
    primary: true
  })

  const out = primary
    ? primary
    : head(info)

  return out || {}
}
