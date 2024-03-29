/* eslint no-param-reassign: 0 */

export function clone(d) {
  return new Date(d.getTime())
}

export function isSameDay(d1, d2) {
  if (!d1 || !d2) {
    return false
  }

  if (!(d1 instanceof Date)) {
    d1 = new Date()
  }

  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  )
}

export function isPastDay(d) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d < today
}

export function isDayBetween(d, d1, d2) {
  d = clone(d)
  d1 = clone(d1)
  d2 = clone(d2)

  d.setHours(0, 0, 0, 0)
  d1.setHours(0, 0, 0, 0)
  d2.setHours(0, 0, 0, 0)
  return (d1 < d && d < d2) || (d2 < d && d < d1)
}

export function addDayToRange(day, range = { from: null, to: null }) {
  let { from, to } = range
  if (!from) {
    from = day
  } else if (from && to && isSameDay(from, to) && isSameDay(day, from)) {
    from = null
    to = null
  } else if (to && day < from) {
    from = day
  } else if (to && isSameDay(day, to)) {
    from = day
    to = day
  } else {
    to = day
    if (to < from) {
      to = from
      from = day
    }
  }

  return { from, to }
}

export function isDayInRange(day, range) {
  const { from, to } = range
  return (
    from && isSameDay(day, from)) ||
    (to && isSameDay(day, to)) ||
    (from && to && isDayBetween(day, from, to)
  )
}
