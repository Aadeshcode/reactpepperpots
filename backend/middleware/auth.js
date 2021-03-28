import asyncHandler from 'express-async-handler'
import User from '../schema/userSchema.js'
import { admin as adminObj } from '../firebase.js'
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization
  ) {
    try {
      token = req.headers.authorization

      const { email } = await adminObj.auth().verifyIdToken(token)

      req.user = await User.findOne({ email })

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}
const member = (req, res, next) => {
  if (req.user && req.user.isMember) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as a Member')
  }
}

export { protect, admin, member }
