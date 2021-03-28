import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getBlogs } from '../actions/blogActions'
import BlogCardComponent from './BlogCardComponent'

const ResourcesComponent = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBlogs())
    }, [dispatch])
    const {  blogs } = useSelector(state => state.blogsList)
    return (
        <div className='container-fluid my-5'>
            <div>
                <h1 className='display-4 p-3'>Resources</h1>
            </div>
            <div className='row flex-row-reverse flex-md-row'>

                <div className='col-12 col-md-4'>
                    <div className='d-flex mx-auto flex-wrap flex-column'>
                        {blogs.slice(0, 3).map((x) =>
                            <NavLink to={`/blogs/${x.slug}`}>

                                <BlogCardComponent data={x} subtitle={true} />
                            </NavLink>
                        )}</div>
                </div>
                <div className='col-12 col-md-8'>
                    <img src={`https://hopeplants.s3.ap-south-1.amazonaws.com/christmas.jpg`} alt="images" className='img-fluid' />
                </div>
            </div>
        </div>
    )
}

export default ResourcesComponent
