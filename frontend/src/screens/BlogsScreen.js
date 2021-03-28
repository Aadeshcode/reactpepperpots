import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getBlogs } from '../actions/blogActions'
import BlogCardComponent from '../components/BlogCardComponent'
import Loader from '../components/Loader'
import Message from '../components/Message'
import one from '../components/pics/blog.jpg'
const BlogsScreen = ({ match }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBlogs())
    }, [dispatch])
    const { loading, error, blogs } = useSelector(state => state.blogsList)
    return loading ? <Loader /> : error ? <Message message={error} /> : (
        <div className='container-fluid'>


            <div>
                <div className='d-flex align-items-center flex-column '>
                    <h1 className="fontXBig text-center">One step closer to proper Parenting of the plant</h1>
                    <p className='fontPBold'> Welcome to the Pepper Pots Blogs. Here you can find articles about takign care of your plants</p>
                </div>

            </div>
            <div className='row my-3 justify-content-center'>
                <div className='col-12 col-md-8'>
                    <img src={one} alt="one" className='img-fluid' />
                </div>
                <div className='col-12 col-md-4'>
                <div className='d-flex mx-auto flex-wrap flex-column'>
                {blogs.slice(0,2).map((x) =>
                    <NavLink to={`/blogs/${x.slug}`}>

                        <BlogCardComponent data={x} subtitle={true}/>
                    </NavLink>
                )}</div>
                </div>

            </div>
            <div className='d-flex mx-auto flex-wrap justify-content-center'>
                {blogs.map((x) =>
                    <NavLink to={`/blogs/${x.slug}`}>

                        <BlogCardComponent data={x} />
                    </NavLink>
                )}</div>

        </div>
    )
}

export default BlogsScreen
