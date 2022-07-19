const catchAsync = require('../utils/catchAsync');
const Message = require('../utils/Message');
const { sendSuccess } = require("../libs/response");
const itemService = require('../services/item.service');

const createItem = catchAsync(async (req, res) => {
  const newItem = await itemService.createItem(req.body);
  sendSuccess({ res, data: newItem, message: Message.itemMsg.created });
});

const getItems = catchAsync(async (req, res) => {
  const categories = await itemService.getItems();
  sendSuccess({ res, data: categories, message: Message.itemMsg.success });
});

const getItemById = catchAsync(async (req, res) => {
  const { itemId } = req.params;
  const itemModel = await itemService.getItemById(itemId);
  sendSuccess({ res, data: itemModel, message: Message.itemMsg.success });
});

const updateItemById = catchAsync(async (req, res) => {
  await itemService.updateItemById(req.body);
  sendSuccess({ res, message: Message.itemMsg.success });

});

const deleteItemById = catchAsync(async (req, res) => {
  const { itemId } = req.params;
  await itemService.deleteItemById(itemId);
  sendSuccess({ res, message: Message.itemMsg.success });
});

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItemById,
  deleteItemById,
};
