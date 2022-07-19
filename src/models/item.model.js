const mongoose = require('mongoose');
const {status, itemType} = require('../utils/constant');

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userId : {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    itemType: {
        type: String,
        enum: [itemType.date, itemType.month],
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    categoryId: {
        type: String,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    qrCode: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: [status.enabled, status.disabled],
        default: status.enabled,
    }
  },
  {
    timestamps: true,
  }
);

const item = mongoose.model('Item', itemSchema);
module.exports = item;
