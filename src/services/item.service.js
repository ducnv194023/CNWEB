const _ = require('lodash');
const Item = require('../models/item.model');
const Message = require('../utils/Message');
const {status, itemType} = require('../utils/constant');
const pick = require('../utils/pick');
const { throwBadRequest } = require('../utils/badRequestHandlingUtils');


// tạo vé bơi / đồ bơi
// TODO: validate mua vé ngày ko truyền endDate - startDate > 1
const createItem = async (itemBody) => {
  // kiểm tra hàng hóa tồn tại 
  const existedItem = await Item.findOne({
    itemName: _.get(itemBody, 'itemName'),
    status: {
      $ne: status.disabled,
    },
  });
  throwBadRequest(existedItem, Message.itemMsg.nameExisted);
  const item = pick(itemBody, [
    'itemName',
    'price',
    'itemType',
    'categoryId',
    'categoryName',
    'description',
  ]);
  return Item.create(item);
};

// lấy tất cả vé bơi / đồ bơi
const getItems = async () => {
  let filter = {};
  if (!filter.status) {
    filter.status = {
      $ne: status.disabled,
    };
  }

  return Item.find({...filter});
};

const getItemById = async (itemId) => {
  const item = await Item.findById(itemId);
  throwBadRequest(!item, Message.itemMsg.notFound);
  return item;
};

const updateItemById = async (itemUpdateRequest) => {
  const itemId = _.get(itemUpdateRequest, 'itemId');
  const itemBody = pick(itemUpdateRequest, [
    'itemName',
    'price',
    'description',
  ]);
    const updateItem = await Item.findByIdAndUpdate(
    itemId, itemBody, { new: true }
  );
  throwBadRequest(!updateItem, Message.itemMsg.notFound);
  return updateItem;
};

const deleteItemById = async (itemId) => {
  const deleteItem = await Item.updateOne(
    {_id: itemId}, {status: status.disabled},
  );
  return deleteItem;
};
module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItemById,
  deleteItemById,
};
