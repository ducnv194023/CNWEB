const moment = require('moment-timezone')

const getTimeFromDateToDate = ({ from, to }, filterKey = 'createdAt') => {
  const options = {}
  if (from) {
    // start of day
    const fromDate = moment.tz(`${from} 00:00:00`, 'utc').toDate()
    options[filterKey] = { ...options[filterKey], $gte: fromDate }
  }
  if (to) {
    // end of day
    const toDate = moment.tz(`${to} 23:59:59`, 'utc').toDate()
    options[filterKey] = { ...options[filterKey], $lte: toDate }
  }

  return options
}

const getTimeByDate = ({ createdAt }, filterKey = 'createdAt') => {
  const options = {}
  if (createdAt) {
    // start of day
    const fromDate = moment.tz(`${createdAt} 00:00:00`, 'utc').toDate()
    options[filterKey] = { ...options[filterKey], $gte: fromDate }
    // end of day
    const toDate = moment.tz(`${createdAt} 23:59:59`, 'utc').toDate()
    options[filterKey] = { ...options[filterKey], $lte: toDate }
  }
  return options
}

const getStartOfDay = () => {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  return today
}
const converterStringToDate = (date) => {
  return moment.tz(`${date} 00:00:00`, 'utc').toDate()
}
module.exports = {
  getTimeFromDateToDate,
  getTimeByDate,
  getStartOfDay,
  converterStringToDate
}
