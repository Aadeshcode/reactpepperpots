import React, { useEffect } from 'react'
import { getRestDetails } from '../actions/restActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

const TermsAndConditions = () => {
    const dispatch = useDispatch()
    const { loading, error, rest } = useSelector(state => state.restDetails)

    useEffect(() => {
        dispatch(getRestDetails('termsAndConditions'))
    }, [dispatch])
    return loading ? <Loader /> : error ? <Message variant='error' message={error} /> : (
        <div className='container' >
            <div className='row justify-content-center'>
                <div className='col-12 col-md-8'>
                    <span dangerouslySetInnerHTML={{ __html: rest }}></span>
                </div>
            </div>
        </div>
    )
}

export default TermsAndConditions
