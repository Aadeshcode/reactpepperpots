import express from 'express'
import { addBlog, deleteBlog, getBlogs, getOneBlog, updateBlog } from '../controllers/blogController.js'
import { admin, protect } from '../middleware/auth.js'
const router = express.Router()


router.route('/').post(protect, admin, addBlog).get(getBlogs)
router.route('/:slug').get(getOneBlog).delete(deleteBlog).put(updateBlog)


export default router