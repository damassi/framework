import moment from 'moment'

export function formatMonthTitle(date, locale = 'en') {
  return moment(date).locale(locale).format('MMMM YYYY')
}

export function formatWeekdayShort(day, locale = 'en') {
  return moment().locale(locale).weekday(day).format('dd')
}

export function formatWeekdayLong(day, locale = 'en') {
  return moment().locale(locale).weekday(day).format('dddd')
}

export function getFirstDayOfWeek(locale = 'en') {
  const localeData = moment.localeData(locale)
  return localeData.firstDayOfWeek()
}
