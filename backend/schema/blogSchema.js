import mongoose from 'mongoose'

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    author: { type: String, required: true },
    lastEdited: { type: Date, default: Date.now() },
    text: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true }
  },
  {
    timestamps: true,
  }
)

const Blog = mongoose.model('Blog', blogSchema)
export default Blog