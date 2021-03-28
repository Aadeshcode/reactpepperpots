import express from 'express'
import { khaltiVerification,esewaVerification } from '../controllers/paymentControllers.js'
const router = express()

router.route('/khaltiVerification').post(khaltiVerification)
router.route('/esewaVerification').post(esewaVerification)


export default router