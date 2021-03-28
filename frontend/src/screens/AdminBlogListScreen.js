import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import AdminBlogComponent from '../components/AdminBlogComponent';
import Message from '../components/Message';
import SmallLoader from '../components/SmallLoader';
import { getBlogs } from '../actions/blogActions';

const AdminBlogListScreen = () => {
    const { loading, error, blogs } = useSelector(state => state.blogsList)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBlogs())
    }, [dispatch])
    return loading ? <div className='d-flex justify-content-center p-5'>  <SmallLoader /></div> : error ?
        <Message variant='danger' message={error} /> :
        <div className="container">

            <h1 className='fontXBig'>Blog page for admin</h1>
            <p className='fontPSmall'>Here are the lists of blogs that you have Created. Now you can see your blogs, edit them or even delete them</p>
            <div className='mt-0 mt-md-5'>
                <NavLink to='/admin/createblog'>
                    <div className='p-3' style={{ width: "60px" }}>

                        <div>
                            <div className='circle btn btn-Greenery d-flex justify-content-center align-items-center'><i class="fas fa-plus"></i></div>
                            <p className='fontPBold'>Create</p>
                        </div>
                    </div>
                </NavLink>
                <div className='d-flex align-items-center flex-wrap justify-content-center'>
                    {blogs.map((x) =>
                        <AdminBlogComponent data={x} />
                    )}
                </div>
            </div>

        </div>

}

export default AdminBlogListScreen
