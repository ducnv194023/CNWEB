const _ = require('lodash')
const Order = require('../models/order.model')
const pick = require('../utils/pick')
const { getTimeByDate, getTimeFromDateToDate } = require('../utils/getTime')
const { status } = require('../utils/constant')

const getRevenueStatistic = async (getRevenueStatisticRequest) => {
  const getRevenueStatisticByDay = []
  const getRevenueStatistic = pick(getRevenueStatisticRequest, ['startDate', 'endDate'])
  const timeFilter = getTimeFromDateToDate(
    { from: _.get(getRevenueStatistic, 'startDate'), to: _.get(getRevenueStatistic, 'endDate') },
    'timeFromDateToDate'
  )
  const startDate = _.get(timeFilter, 'timeFromDateToDate.$gte')
  const endDate = _.get(timeFilter, 'timeFromDateToDate.$lte')
  const getOrdersFromDateToDate = await Order.find({ paidedTime: { $gte: startDate, $lte: endDate }, status: status.paided })
  const timeAtDateFilter = getTimeByDate({ createdAt: _.get(getRevenueStatistic, 'startDate') }, 'timeAtDate')
  const startOfDate = _.get(timeAtDateFilter, 'timeAtDate.$gte')
  const endOfDate = _.get(timeAtDateFilter, 'timeAtDate.$lte')
  // eslint-disable-next-line no-unmodified-loop-condition
  while (startOfDate < endDate) {
    const getPriceOfOrdersAtDate = _.sumBy(getOrdersFromDateToDate, (getOrderFromDateToDate) => {
      if (getOrderFromDateToDate.paidedTime <= endOfDate && getOrderFromDateToDate.paidedTime >= startOfDate) {
        return getOrderFromDateToDate.totalPrice
      }
    })
    getRevenueStatisticByDay.push({
      date: startOfDate.toISOString().split('T')[0],
      totalRevenueOfDay: getPriceOfOrdersAtDate
    })
    startOfDate.setDate(startOfDate.getDate() + 1)
    endOfDate.setDate(endOfDate.getDate() + 1)
  }
  return getRevenueStatisticByDay
}

module.exports = {
  getRevenueStatistic
}
