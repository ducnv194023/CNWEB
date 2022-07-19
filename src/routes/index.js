const {Router} = require('express');
const router = Router();
const AuthRouter = require('./auth.route')
const CategoryRouter = require('./category.route');

router.use('/auth', AuthRouter);
router.use('/categories', CategoryRouter);


module.exports = router;