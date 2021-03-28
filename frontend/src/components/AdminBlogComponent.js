import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../actions/blogActions'
import { NavLink } from 'react-router-dom';
const AdminBlogComponent = ({ data }) => {
    const dispatch = useDispatch()
    return (

        <div className='card mx-1' style={{ width: "300px", height: '350px', overflow: 'hidden' }}>
            <div className='card-header' style={{ width: "300px", height: '200px', overflow: 'hidden' }}>

                <img src={`https://hopeplants.s3.ap-south-1.amazonaws.com${data.image}`} alt="" className='card-img-top img-fluid' />
            </div>
            <div className='card-body'>
                <h1 className='fontSmall d-block text-truncate'>{data.title}</h1>
                <p>{`Author: ${data.author}`}</p>
                <div />
                <div className='d-flex justify-content-center'>
                    <NavLink to={`/blogs/${data.slug}`}>
                        <i className='fas fa-eye p-3'></i>
                    </NavLink>
                    <NavLink to={`/admin/${data.slug}/editblog`}><i className='fas fa-edit p-3'></i></NavLink>
                    <i className='far fa-trash-alt p-3' style={{cursor:'pointer'}} onClick={() => dispatch(deleteBlog(data.slug))}></i>
                </div>

            </div>

        </div>

    )
}

export default AdminBlogComponent
