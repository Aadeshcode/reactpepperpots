import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCoupons } from '../actions/couponActions'
import { userMembershipCheck } from '../actions/userActions'
import CouponComponentCard from '../components/CouponComponentCard'

const MembershipScreen = () => {
    const dispatch = useDispatch()
    const { isMember } = useSelector(state => state.userMembershipCheck)
    const { coupons } = useSelector(state => state.couponsList)
 
    useEffect(() => {

        dispatch(userMembershipCheck())
        dispatch(getCoupons('onlyForMembers=true'))

    }, [dispatch])
    return (
        <div className='container'>
            <h1 className='fontXBig'>Membership</h1>
            <div className='row'>
                {isMember ? <>  <h1>Congratulations! You are a Member.</h1>
                    <p> You can get Exclusive Discounts on Our Products including merchs and other perks. Here are the list of Coupons Available only for Members. You can use them Only once</p> </> : <p>You Are Not A Member</p>}
            </div>
            <div className='row'>
            
                {coupons.map((x) => <CouponComponentCard coupon={x} />)}
            </div>
        </div>
    )
}

export default MembershipScreen
