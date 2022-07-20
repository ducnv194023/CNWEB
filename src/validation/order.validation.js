const Joi = require('joi')
const { objectId } = require('../validation/custom.validation')

const orderItem = Joi.object().keys({
  itemId: Joi.required().custom(objectId),
  itemName: Joi.string(),
  itemPrice: Joi.number(),
  itemQuantity: Joi.number()
})

const createOrder = {
  body: Joi.object().keys({
    orderName: Joi.string().required(),
    orderItems: Joi.array().items(orderItem),
    description: Joi.string().allow('')
  })
}

const updateOrder = {
  body: Joi.object().keys({
    orderName: Joi.string().required(),
    orderItems: Joi.array().items(orderItem),
    description: Joi.string().allow('')
  })
}

module.exports = {
  createOrder,
  updateOrder
}
