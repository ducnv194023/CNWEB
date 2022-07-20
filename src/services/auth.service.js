const _ = require('lodash')
const User = require('../models/users.model')
const { throwBadRequest } = require('../utils/badRequestHandlingUtils')
const { UserMsg } = require('../utils/Message')
const pick = require('../utils/pick')
const { attachTokenToRes, generateAccessToken } = require('../helpers/jwt')
const createToken = require('../helpers/createToken')

const registerUser = async (registerUserRequest) => {
  const registerUser = pick(registerUserRequest, ['phone', 'password', 'name'])
  const phone = _.get(registerUser, 'phone')
  const user = await User.findOne({ phone })
  throwBadRequest(user, UserMsg.phoneExisted)
  if (User.countDocuments({}) === 0) {
    return User.create({
      ...registerUser,
      role: 'admin'
    })
  }
  return User.create(registerUser)
}

const loginUser = async (loginUserRequest, res) => {
  const loginUser = pick(loginUserRequest, ['phone', 'password'])
  const phone = _.get(loginUser, 'phone')
  const password = _.get(loginUser, 'password')
  const user = await User.findOne({ phone })
  throwBadRequest(!user, UserMsg.notFound)
  const isPasswordCorrect = await user.comparePassword(password)
  throwBadRequest(!isPasswordCorrect, UserMsg.notCorrectPassword)
  attachTokenToRes(res, user)
  const userToken = createToken(user)
  const accessToken = generateAccessToken({ payload: userToken })
  return { user: userToken, token: accessToken }
}

module.exports = {
  registerUser,
  loginUser
}
