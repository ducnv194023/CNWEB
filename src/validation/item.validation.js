const Joi = require("joi");
const { objectId } = require("../validation/custom.validation");
const { itemType } = require('../utils/constant')

const createItem = Joi.object().keys({
  itemName: Joi.string().required(),
  price: Joi.number().required(),
  itemType: Joi.string().valid(itemType.ticketDate, itemType.ticketMonth, itemType.swimming_wear),
  description: Joi.string(),
});

const createOrder = {
  body: Joi.object().keys({
    orderName: Joi.string().required(),
    orderItems: Joi.array().items(orderItem),
    description: Joi.string().allow(""),
  }),
};

const updateOrder = {
  body: Joi.object().keys({
    orderName: Joi.string().required(),
    orderItems: Joi.array().items(orderItem),
    description: Joi.string().allow(""),
  }),
}

module.exports = {
  createOrder,
  updateOrder,
};
