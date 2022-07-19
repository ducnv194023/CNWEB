const {Router} = require('express');
const router = Router();
const AuthRouter = require('./auth.route');
const { route } = require('./category.route');
const CategoryRouter = require('./category.route');
const ItemRouter = require('./item.route');

router.use('/auth', AuthRouter);
router.use('/categories', CategoryRouter);
router.use('/items', ItemRouter);


module.exports = router;