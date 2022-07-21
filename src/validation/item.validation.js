const Joi = require('joi')
const { objectId } = require('../validation/custom.validation')
const { itemType } = require('../utils/constant')

const createItem = Joi.object().keys({
  itemName: Joi.string().required(),
  price: Joi.number().required(),
  itemType: Joi.string().valid(itemType.ticketDate, itemType.ticketMonth, itemType.swimming_wear),
  image: Joi.string().required(),
  description: Joi.string()
})

const getItems = {
  body: Joi.object().keys({
    itemType: Joi.string()
  })
}

const updateItem = {
  body: Joi.object().keys({
    itemId: Joi.required().custom(objectId),
    itemName: Joi.string(),
    price: Joi.number(),
    image: Joi.string(),
    description: Joi.string()
  })
}

const signTicket = {
  body: Joi.object().keys({
    itemName: Joi.string().required(),
    price: Joi.number().required(),
    itemType: Joi.string().valid(itemType.ticketDate, itemType.ticketMonth, itemType.swimming_wear),
    image: Joi.string().required(),
    description: Joi.string(),
    userId: Joi.required().custom(objectId),
    userName: Joi.string().required(),
    phone: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    qrCode: Joi.string().required()
  })
}

const getOwnerTicket = {
  body: Joi.object().keys({
    userId: Joi.required().custom(objectId)
  })
}

const signSwimmingWear = {
  body: Joi.object().keys({
    itemName: Joi.string().required(),
    price: Joi.number().required(),
    itemType: Joi.string().valid(itemType.ticketDate, itemType.ticketMonth, itemType.swimming_wear),
    image: Joi.string().required(),
    description: Joi.string(),
    userId: Joi.required().custom(objectId),
    userName: Joi.string().required(),
    phone: Joi.string().required()
  })
}
const getOwnerWear = {
  body: Joi.object().keys({
    userId: Joi.required().custom(objectId)
  })
}

module.exports = {
  createItem,
  getItems,
  updateItem,
  signTicket,
  getOwnerTicket,
  signSwimmingWear,
  getOwnerWear
}
