const mongoose = require('mongoose')
const { status, itemType } = require('../utils/constant')

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    userName: {
      type: String
    },
    userId: {
      type: String
    },
    phone: {
      type: String
    },
    itemType: {
      type: String,
      enum: [itemType.ticketDate, itemType.ticketMonth, itemType.swimming_wear]
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    description: {
      type: String
    },
    qrCode: {
      type: String
    },
    status: {
      type: String,
      enum: [status.activated, status.not_yet_activated, status.deactivated, status.disabled]
    }
  },
  {
    timestamps: true
  }
)

const item = mongoose.model('Item', itemSchema)
module.exports = item
