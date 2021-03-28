import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getoneBlog } from '../actions/blogActions'
import one from './pics/blog.jpg'
const BlogLeaflet = () => {
    const dispatch = useDispatch()
    const { blog } = useSelector(state => state.blogDetails)
    useEffect(() => {
        dispatch(getoneBlog("The-Best-Plants-for-Holiday-Decorating"))
    }, [dispatch])
    return (
        <div className='row mt-5 align-items-center justify-content-center text-center'>
            <div className='col-12 col-md-6'>
                <h1>{blog.title}</h1>
                <p>{blog.subTitle}</p>
                <NavLink to={`/blogs/${blog.slug}`}>
                    <button className='btn btn-Greenery p-3 btn-block'>Read Full Blog</button>
                </NavLink>
            </div>
            <div className='col-12 col-md-6'>
                <img src={`https://hopeplants.s3.ap-south-1.amazonaws.com${blog.image}`} alt='one' class='img-fluid' />
            </div>
        </div>
    )
}

export default BlogLeaflet
