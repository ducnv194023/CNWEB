const _ = require('lodash')
const Item = require('../models/item.model')
const Message = require('../utils/Message')
const { status, itemType } = require('../utils/constant')
const { converterStringToDate, getStartOfDay } = require('../utils/getTime')
const pick = require('../utils/pick')
const { throwBadRequest } = require('../utils/badRequestHandlingUtils')

// tạo vé bơi / đồ bơi
const createItem = async (itemBody) => {
  // kiểm tra hàng hóa tồn tại
  const existedItem = await Item.findOne({
    itemName: _.get(itemBody, 'itemName'),
    status: {
      $ne: status.disabled
    }
  })
  throwBadRequest(existedItem, Message.itemMsg.nameExisted)
  const item = pick(itemBody, [
    'itemName',
    'price',
    'itemType',
    'description',
    'image'
  ])
  console.log(item);
  return Item.create(item)
}

// lấy tất cả vé bơi / đồ bơi
const getItems = async (requestBody) => {
  const filter = {}
  const itemTypeString = _.get(requestBody, 'itemType')
  const itemTypeList = itemTypeString.split(',')
  filter.itemType = { $in: itemTypeList }
  filter.userId = { $exists: false }
  if (!filter.status) {
    filter.status = {
      $ne: status.disabled
    }
  }

  return Item.find({ ...filter })
}

const getItemById = async (itemId) => {
  const item = await Item.findById(itemId)
  throwBadRequest(!item, Message.itemMsg.notFound)
  return item
}

const updateItemById = async (itemUpdateRequest) => {
  const itemId = _.get(itemUpdateRequest, 'itemId')
  const itemBody = pick(itemUpdateRequest, [
    'itemName',
    'price',
    'description',
    'image'
  ])
  const updateItem = await Item.findByIdAndUpdate(
    itemId, itemBody, { new: true }
  )
  throwBadRequest(!updateItem, Message.itemMsg.notFound)
  return updateItem
}

const deleteItemById = async (itemId) => {
  const deleteItem = await Item.updateOne(
    { _id: itemId }, { status: status.disabled }
  )
  return deleteItem
}
// TODO: validate mua vé ngày ko truyền endDate - startDate > 1
const signTicket = async (requestBody) => {
  const item = pick(requestBody, [
    'itemName',
    'price',
    'image',
    'userId',
    'userName',
    'phone',
    'itemType',
    'startDate',
    'endDate',
    'qrCode',
    'description'
  ])
  const startDate = _.get(item, 'startDate')
  item.startDate = converterStringToDate(startDate)
  const endDate = _.get(item, 'endDate')
  item.endDate = converterStringToDate(endDate)
  const today = getStartOfDay()
  // Nếu startDate > today thì vé sẽ ở trạng thái chưa áp dụng
  if (item.startDate > today) {
    item.status = status.not_yet_activated
  }
  // Nếu today >= startDate và today <= endDate thì vé ở trạng thái áp dụng
  if (item.endDate >= today && today >= item.startDate) {
    item.status = status.activated
  }
  return Item.create(item)
}

const getOwnerTicket = async (requestBody) => {
  const userId = _.get(requestBody, 'userId')
  const ownerTickets = await Item.find({
    userId,
    itemType: { $ne: itemType.swimming_wear }
  })
  // converter status
  const today = getStartOfDay()
  _.forEach(ownerTickets, (item) => {
    if (item.endDate < today) {
      item.status = status.deactivated
    }
    if (today < item.startDate) {
      item.status = status.not_yet_activated
    }
    if (item.endDate >= today && today >= item.startDate) {
      item.status = status.activated
    }
  })
  return ownerTickets
}

const signSwimmingWear = async (requestBody) => {
  const swimmingWear = pick(requestBody, [
    'itemName',
    'price',
    'image',
    'userId',
    'userName',
    'phone',
    'itemType',
    'description'
  ])
  return Item.create(swimmingWear)
}

const getOwnerWear = async (requestBody) => {
  const userId = _.get(requestBody, 'userId')
  const getOwnerWears = await Item.find({
    userId,
    itemType: itemType.swimming_wear
  })
  return getOwnerWears
}

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItemById,
  deleteItemById,
  signTicket,
  getOwnerTicket,
  signSwimmingWear,
  getOwnerWear
}
