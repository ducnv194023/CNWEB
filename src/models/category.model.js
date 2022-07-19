const mongoose = require('mongoose');
const {status} = require('../utils/constant');

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    description: {
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

const category = mongoose.model('Category', categorySchema);
module.exports = category;
