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
    },
    userId : {
        type: mongoose.type.ObjectId(),
    },
    phone: {
        type: String,
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
        type: mongoose.type.ObjectId(),
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
