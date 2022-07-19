const catchAsync = require('../utils/catchAsync');
const Message = require('../utils/Message');
const { sendSuccess } = require("../libs/response");
const categoryService = require('../services/category.service');

const createCategory = catchAsync(async (req, res) => {
  const newCategory = await categoryService.createCategory(req.body);
  sendSuccess({ res, data: newCategory, message: Message.categoryMsg.created });
});

const getCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getCategories();
  sendSuccess({ res, data: categories, message: Message.categoryMsg.success });
});

const getCategoryById = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const categoryModel = await categoryService.getCategoryById(categoryId);
  sendSuccess({ res, data: categoryModel, message: Message.categoryMsg.success });
});

const updateCategoryById = catchAsync(async (req, res) => {
  await categoryService.updateCategoryById(req.body);
  sendSuccess({ res, message: Message.categoryMsg.success });

});

const deleteCategoryById = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  await categoryService.deleteCategoryById(categoryId);
  sendSuccess({ res, message: Message.categoryMsg.success });
});

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
