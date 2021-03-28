import express from 'express'
import { deleteFaqs, faqCreate, getFaqDetails, getFaqs, updateFaqs } from '../controllers/FAQControllers.js'
import { admin, protect } from '../middleware/auth.js'
const router = express()

router.route('/').get(getFaqs).post(protect, admin, faqCreate)
router.route('/:id').put(protect, admin, updateFaqs).delete(deleteFaqs).get(getFaqDetails)
export default router