const mongoose = require('mongoose')
const { status } = require('../utils/constant')
const { getStartOfDay } = require('../utils/getTime')

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
orderSchema.statics.getLastOrderToday = async function () {
  const startOfDay = getStartOfDay()
  return this.find({
    createdAt: { $gte: startOfDay }
  })
    .sort({ createdAt: -1 })
    .limit(1)
}
const order = mongoose.model('Order', orderSchema)
module.exports = order
