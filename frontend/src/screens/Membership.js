import React, { useEffect } from 'react'
import one from '../components/pics/membership.jpg'
import two from '../components/pics/bg.jpg'
import { getRestDetails } from '../actions/restActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductYouMightLikeComponent from '../components/ProductYouMightLikeComponent'
import PotsYouMightLikeComponent from '../components/PotsYouMightLikeComponent'
import KhaltiPayment from '../components/KhaltiPayment'
import { userMembershipCheck } from '../actions/userActions'
const Membership = () => {
    const dispatch = useDispatch()
    const { loading, error, rest } = useSelector(state => state.restDetails)
    const { isMember } = useSelector(state => state.userMembershipCheck)
    const { loading: memUpdateLoading, success: memUpdateSuccess } = useSelector(state => state.userMembershipUpdate)

    useEffect(() => {
        dispatch(getRestDetails('membership'))
        dispatch(userMembershipCheck())
    }, [dispatch])
    useEffect(() => {
        if (memUpdateSuccess) {
            dispatch(userMembershipCheck())
        }
    }, [memUpdateSuccess]) //eslint-disable-line
    return loading || memUpdateLoading ? <Loader /> : error ? <Message message={error} variant='error' /> : (<>
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <img src={one} alt='membership' className='img-fluid' />
                </div>
                <div className='col-12 col-md-6 mt-4 mt-md-0'>
                    <h1 className='display-4'>Plant Parent Club</h1>
                    <h1 className='text-md-left text-center'>Rs 3000</h1>
                    <KhaltiPayment cart="" buttonText="Rs 3000/year - Become a Member" alreadyMember={isMember ? isMember : false} membership={true} method={[
                        "KHALTI",
                        "EBANKING",
                        "MOBILE_BANKING",
                        "CONNECT_IPS",
                        "SCT",
                    ]} />

                    <div className='row mt-3' >
                        <div className='col-12 col-md-3'>
                            <p className='fontPBold'>Details</p>
                        </div>
                        <div className='col-12 col-md-9 '>
                            <span dangerouslySetInnerHTML={{ __html: rest.firstPara }}></span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div className='container-fluid'>
            <div className='secondParaWrapper row align-items-center justify-content-center  px-3 my-5'>
                <div className='col-12 col-md-8 secondPara p-md-5 p-2 '>
                    <span dangerouslySetInnerHTML={{ __html: rest.secondPara }}></span>
                </div>
            </div>
            <div>
                <ProductYouMightLikeComponent />
            </div>
            <div className='row justify-content-center align-items-center my-md-5 my-3'>
                <div className='col-12 col-md-6'>
                    <img src={two} alt='second' className='img-fluid' />
                </div>

                <div className='col-12 col-md-6 secondPara p-md-5 p-2 '>
                    <span dangerouslySetInnerHTML={{ __html: rest.thirdPara }}></span>
                </div>

            </div>
            <div>
                <PotsYouMightLikeComponent />
            </div>
        </div>
    </>
    )
}

export default Membership
