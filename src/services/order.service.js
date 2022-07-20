const _ = require("lodash");
const User = require("../models/users.model");
const Order = require("../models/order.model");
const { throwBadRequest } = require("../utils/badRequestHandlingUtils");
const { orderMsg } = require("../utils/Message");
const pick = require("../utils/pick");
const { status } = require("../utils/constant");

const createOrder = async (createOrderRequest, user) => {
  const userCreatedOrder = await User.findById(user.id);
  const { phone, name } = userCreatedOrder;
  const createOrder = pick(createOrderRequest, ["orderName", "orderItems", "description"]);
  const orderName = _.get(createOrder, "orderName");
  const orderWithOrderName = await Order.findOne({orderName});
  throwBadRequest(orderWithOrderName, orderMsg.nameExisted);
  const orderItems = _.get(createOrder, "orderItems");
  _.forEach(orderItems, (orderItem) => {
    orderItem.itemTotalPrice = orderItem.itemPrice * orderItem.itemQuantity;
  });
  createOrder.totalPrice = _.sumBy(orderItems, "itemTotalPrice");
  return Order.create({...createOrder, userId: user.id, userName: name, userPhone: phone});
};

const payOrder = async (payOrderRequest) => {
    const payOrder = pick(payOrderRequest, ["orderId", "orderItems", "status"]);
    const orderId = _.get(payOrder, "orderId");
    throwBadRequest(!orderId, orderMsg.notFound);
    const orderItems = _.get(payOrder, "orderItems");
    _.forEach(orderItems, (orderItem) => {
        orderItem.itemTotalPrice = orderItem.itemPrice * orderItem.itemQuantity;
      });
    payOrder.totalPrice = _.sumBy(orderItems, "itemTotalPrice");
    const statusOfOrder = _.get(payOrder, "status");
    if (statusOfOrder = status.paided) {
      payOrder.paidedTime = Date.now();
    }
    return Order.findByIdAndUpdate(orderId, payOrder, {new: true});
};

const getOrder = async (orderId) => {
    const order = await Order.findById(orderId);
    throwBadRequest(!order, orderMsg.notFound);
    return order;
};

module.exports = {
    createOrder,
    payOrder,
    getOrder,
};