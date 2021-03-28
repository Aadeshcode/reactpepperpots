import expressAsyncHandler from "express-async-handler";
import Blog from "../schema/blogSchema.js";
import slugify from 'slugify'


export const addBlog = expressAsyncHandler(async (req, res) => {
    try {
        const {
            title,
            subTitle,
            text,
            image,
        } = req.body

        const blog = new Blog({
            title,
            subTitle,
            text,
            image,
            slug: slugify(title),
            author: req.user.email
        })

        const createdBlog = await blog.save()
        res.json(createdBlog)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})


export const updateBlog = expressAsyncHandler(async (req, res) => {
    try {
        const {
            title,
            subTitle,
            text,
            image,
        } = req.body
console.log(req.params.slug)
        const blog = await Blog.findOne({ slug: req.params.slug })
        console.log(blog)
        blog.title = title
        blog.subTitle = subTitle
        blog.text = text
        blog.image = image
        blog.slug = slugify(title)
        blog.user = blog.user
        const updatedBlog = await blog.save()
        res.json(updatedBlog)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})
export const getBlogs = expressAsyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find({})

        if (blogs) {
            res.json(blogs)
        }
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

export const getOneBlog = expressAsyncHandler(async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug })
        if (blog) {
            res.json(blog)
        }
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})
export const deleteBlog = expressAsyncHandler(async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug })
        console.log(req.params.slug)
        if (blog) {
            blog.remove()
            res.send("Blog Removed")
        } else {
            res.send("Not Found")
        }
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})
