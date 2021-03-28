import express from 'express'
import { addWholeSalers, getWholeSalers } from '../controllers/wholeSalersControllers.js'
const router = express.Router()

router.route('/').get(getWholeSalers).post(addWholeSalers)

export default router