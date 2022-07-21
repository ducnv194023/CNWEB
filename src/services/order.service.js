const _ = require('lodash')
const User = require('../models/users.model')
const Order = require('../models/order.model')
const { throwBadRequest } = require('../utils/badRequestHandlingUtils')
const { orderMsg } = require('../utils/Message')
const pick = require('../utils/pick')
const { status, prefix } = require('../utils/constant')
// privated
const _getNextOrderName = async () => {
  const lastOrder = await Order.getLastOrderToday()
  if (_.isEmpty(lastOrder)) {
    return '001'
  }
  // get 3 last characters of the pattern CCC-YYYYMMDDxxx
  // order 001
  const lastNumberStr = _.get(lastOrder, '0.orderName', '').substring(5, 8)
  const nextNumber = parseInt(lastNumberStr, 10) + 1
  return nextNumber.toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false })
}

const _getOrderName = async () => {
  const prefixNumber = prefix.order
  const number = await _getNextOrderName()
  return `${prefixNumber} ${number}`
}
const createOrder = async (createOrderRequest, user) => {
  const userCreatedOrder = await User.findById(user.id)
  const { phone, name } = userCreatedOrder
  const createOrder = pick(createOrderRequest, ['orderName', 'orderItems', 'description'])
  const orderName = _getOrderName()
  const orderWithOrderName = await Order.findOne({ orderName })
  throwBadRequest(orderWithOrderName, orderMsg.nameExisted)
  const orderItems = _.get(createOrder, 'orderItems')
  _.forEach(orderItems, (orderItem) => {
    orderItem.itemTotalPrice = orderItem.itemPrice * orderItem.itemQuantity
  })
  createOrder.totalPrice = _.sumBy(orderItems, 'itemTotalPrice')
  return Order.create({ ...createOrder, userId: user.id, userName: name, userPhone: phone })
}

const payOrder = async (payOrderRequest) => {
  const orderId = _.get(payOrderRequest, 'orderId')
  throwBadRequest(!orderId, orderMsg.notFound)
  return Order.findByIdAndUpdate(orderId, { status: status.paided, paidedTime: Date.now() }, { new: true })
}

const updateOrder = async (updateOrderRequest) => {
  const orderId = _.get(updateOrderRequest, 'orderId')
  throwBadRequest(!orderId, orderMsg.notFound)
  const payOrder = pick(updateOrderRequest, ['orderName', 'orderItems', 'description'])
  const orderItems = _.get(payOrder, 'orderItems')
  _.forEach(orderItems, (orderItem) => {
    orderItem.itemTotalPrice = orderItem.itemPrice * orderItem.itemQuantity
  })
  payOrder.totalPrice = _.sumBy(orderItems, 'itemTotalPrice')
  return Order.findByIdAndUpdate(orderId, payOrder, { new: true })
}

const getOrder = async (orderId) => {
  const order = await Order.findById(orderId)
  throwBadRequest(!order, orderMsg.notFound)
  return order
}

module.exports = {
  createOrder,
  payOrder,
  updateOrder,
  getOrder
}
