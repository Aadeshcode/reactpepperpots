import express from 'express'
import { addtoCart, clearCart, deleteCartItem, getCart, updateSelected } from '../controllers/CartController.js'
const router = express.Router()
import { protect, admin } from '../middleware/auth.js'

router.route('/').put(protect,addtoCart).get(protect,getCart).delete(protect,clearCart)
router.route('/:id').delete(protect,deleteCartItem).put(updateSelected)

export default router