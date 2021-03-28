import React from 'react'

const CouponComponentCard = ({coupon}) => {
    console.log(coupon.code)
    return (
        <div className='col-12 col-sm-6 col-md-3 couponWrapper d-flex flex-column align-items-center p-3'>
            <div className='couponImgWrapper'>
                <img src={`https://hopeplants.s3.ap-south-1.amazonaws.com${coupon.image}`} alt={coupon.code} className='img-fluid' />
            </div>
            <div>
                <p>{coupon.code}</p>
                <p>{coupon.description}</p>
            </div>
        </div>
    )
}

export default CouponComponentCard
