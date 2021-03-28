import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getoneBlog } from '../actions/blogActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const OneBlogScreen = ({ match }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        window.scrollTo(0,0)
        dispatch(getoneBlog(match.params.slug))
    }, [dispatch, match])
    const { loading, error, blog } = useSelector(state => state.blogDetails)
    return loading ? <Loader /> : error ? <Message message={error} /> : (
        <div className='container'>
            <h1 className="fontXBig text-center">{blog.title}</h1>
            <p className="fontPBold text-center">{blog.subTitle}</p>
            <div className='container p-0 p-md-5'>
                <img src={`https://hopeplants.s3.ap-south-1.amazonaws.com${blog.image}`} alt="" className='card-img-top img-fluid' />
            </div>
            <div className='row justify-content-center'>
                <div className='col-12 col-md-6'>
                    <span dangerouslySetInnerHTML={{ __html: blog.text }}></span>
                </div>

            </div>
        </div>
    )
}

export default OneBlogScreen
