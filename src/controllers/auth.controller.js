const { sendSuccess } = require('../libs/response')
const catchAsync = require('../utils/catchAsync')
const authService = require('../services/auth.service')
const { SystemMsg } = require('../utils/Message')

const register = catchAsync(async (req, res) => {
  const newuser = await authService.registerUser(req.body)
  sendSuccess({ res, data: newuser, message: SystemMsg.successRegister })
})

const login = catchAsync(async (req, res) => {
  const user = await authService.loginUser(req.body, res)
  console.log(user)
  sendSuccess({ res, data: user, message: SystemMsg.successLogin })
})

const logout = catchAsync(async (req, res) => {
  res.clearCookie('accessToken')
  sendSuccess({ res, message: SystemMsg.successLogout })
})

const getUser = catchAsync(async (req, res) => {
  const user = req.user
  sendSuccess({ res, data: user })
})

module.exports = {
  register,
  login,
  logout,
  getUser
}
