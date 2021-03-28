import express from 'express'
import { addRest, deleteRest, getOneRest, getRest, updateRest } from '../controllers/restControllers.js'
const router = express()

router.route('/').get(getRest).post(addRest).delete(deleteRest)
router.route('/:field').get(getOneRest).put(updateRest)
export default router