const _ = require('lodash');
const Category = require('../models/category.model');
const Message = require('../utils/Message');
const {status} = require('../utils/constant');
const pick = require('../utils/pick');
const { throwBadRequest } = require('../utils/badRequestHandlingUtils');


// tạo danh mục

const createCategory = async (categoryBody) => {
  // kiểm tra hàng hóa tồn tại 
  const existedCategory = await Category.findOne({
    categoryName: _.get(categoryBody, 'categoryName'),
    status: {
      $ne: status.disabled,
    },
  });
  throwBadRequest(existedCategory, Message.categoryMsg.nameExisted);
  const category = pick(categoryBody, [
    'categoryName',
    'description',
  ]);
  return Category.create(category);
};

// lấy tất cả danh mục
const getCategories = async () => {
  let filter = {};
  if (!filter.status) {
    filter.status = {
      $ne: status.disabled,
    };
  }

  return Category.find({...filter});
};

const getCategoryById = async (categoryId) => {
  const category = await Category.findById(categoryId);
  throwBadRequest(!category, Message.categoryMsg.notFound);
  return category;
};

const updateCategoryById = async (categoryUpdateRequest) => {
  const categoryId = _.get(categoryUpdateRequest, 'categoryId');
  const categoryBody = pick(categoryUpdateRequest, [
    'categoryName',
    'description',
  ]);
    const updateCategory = await Category.findByIdAndUpdate(
    categoryId, categoryBody, { new: true }
  );
  throwBadRequest(!updateCategory, Message.categoryMsg.notFound);
  return updateCategory;
};

const deleteCategoryById = async (categoryId) => {
  const deleteCategory = await Category.updateOne(
    {_id: categoryId}, {status: status.disabled},
  );
  return deleteCategory;
};
module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
