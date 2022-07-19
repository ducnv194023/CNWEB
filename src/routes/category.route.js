const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");
const { authValidation } = require("../validation/auth.validation");

const router = Router();

router.route('/')
// Thêm một loại danh mục
.post(createCategory)
// Lấy ra tất cả loại danh mục
.get(getCategories);


router.route('/categoryId')
// Lấy ra một danh mục
.get(getCategory)
// Cập nhật danh mục
.patch(updateCategory)
// Xóa một loại danh mục
.delete(deleteCategory)

module.exports = router;
