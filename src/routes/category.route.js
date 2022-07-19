const { Router } = require("express");
const categoryController = require("../controllers/category.controller");


const router = Router();

router.route('/')
// Thêm một loại danh mục
.post(categoryController.createCategory)
// Lấy ra tất cả loại danh mục
.get(categoryController.getCategories);


router.route('/categoryId')
// Lấy ra một danh mục
.get(categoryController.getCategoryById)
// Cập nhật danh mục
.patch(categoryController.updateCategoryById)
// Xóa một loại danh mục
.delete(categoryController.deleteCategoryById)

module.exports = router;
