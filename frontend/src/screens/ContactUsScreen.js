import React, { useEffect } from 'react'
import { getRestDetails } from '../actions/restActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
const ContactUsScreen = () => {
    const dispatch = useDispatch()
    const { loading, error, rest } = useSelector(state => state.restDetails)

    useEffect(() => {
        dispatch(getRestDetails('contactUs'))
    }, [dispatch])

    return loading ? <Loader /> : error ? <Message variant='danger' message={error} /> : (
        <div className='container'>
            <div className='row'>
            <div className='col-12 col-md-8 p-0'>
<img src="https://cdn.shopify.com/s/files/1/1850/2479/files/play2_1500x.jpg?v=1557694373" alt="shopifyimage" className='img-fluid'/>
            </div>
            <div className='col-12 col-md-4 bg-white p-0 text-center d-flex align-items-center'>

                <span dangerouslySetInnerHTML={{ __html: rest }}></span>
            </div>
            </div>
        </div>
    )
}

export default ContactUsScreen
