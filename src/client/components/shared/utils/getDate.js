import moment from 'moment'
import parseFormat from 'moment-parseformat'

export default function getDate(date, dateFormat = 'MM/DD/YYYY') {
  if (!date) {
    return undefined
  }

  return moment(date, parseFormat(date)).format(dateFormat)
}
