const catchAsync = require('../utils/catchAsync')
const orderService = require('../services/order.service')
const { sendSuccess } = require('../libs/response')
const { orderMsg } = require('../utils/Message')

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body, req.user)
  sendSuccess({ res, data: order, message: orderMsg.success })
})

const payOrder = catchAsync(async (req, res) => {
  await orderService.payOrder(req.body)
  sendSuccess({ res, message: orderMsg.success })
})

const updateOrder = catchAsync(async (req, res) => {
  await orderService.updateOrder(req.body)
  sendSuccess({ res, message: orderMsg.success })
})

const getOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params
  const order = await orderService.getOrder(orderId, req.user)
  sendSuccess({ res, data: order, message: orderMsg.success })
})

module.exports = {
  createOrder,
  payOrder,
  updateOrder,
  getOrder
}
