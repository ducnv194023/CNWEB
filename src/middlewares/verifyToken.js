const { isToken } = require('../helpers/jwt')
const { sendError } = require('../libs/response')

const verifyToken = async (req, res, next) => {
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return sendError({ res, code: 401, message: 'Access token not found' })
  }

  try {
    const user = await isToken(token)
    req.user = user
    next()
  } catch (error) {
    return sendError({ res, code: 403, message: 'Invalid token' })
  }
}

module.exports = verifyToken
