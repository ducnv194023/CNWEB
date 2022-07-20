const mongoose = require('mongoose')
const { status } = require('../utils/constant')

const orderSchema = new mongoose.Schema(
  {
    orderName: {
      type: String,
      required: true
    },
    orderItems: [
      {
        itemId: {
          type: String
        },
        itemName: {
          type: String
        },
        itemPrice: {
          type: Number
        },
        itemQuantity: {
          type: Number
        }
      }
    ],
    status: {
      type: String,
      enum: [status.unpaid, status.paided, status.disabled],
      default: status.unpaid
    },
    userId: {
      type: String
    },
    userName: {
      type: String
    },
    userPhone: {
      type: String
    },
    totalPrice: {
      type: Number
    },
    description: {
      type: String
    },
    paidedTime: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

const order = mongoose.model('Order', orderSchema)
module.exports = order
