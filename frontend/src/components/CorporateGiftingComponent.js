import React from 'react'
import one from './pics/office.jpg'
const CorporateGiftingComponent = () => {
    return (
        <div className='container-fluid'>
            
            <div className='row align-items-center'>
                <div className='col-12 col-md-6'>
                    <img src={one} alt='one' class='img-fluid' />
                </div>
                <div className='col-12 col-md-6'>
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                        <h1 className='display-4 px-2 mb-0'>Corporate Gifting</h1>
                        <p className='px-2 pt-0'>Gift Succulents to Your Staffs, Co-Workers or Collegues </p>
                       
                        <p className='text-center'>Indoor plants can boost your mood, reduce your stress, and bring tranquility to your space. Make this season and the new year healthier & happier with greenery delivered to their door.</p>
                        <button className='btn btn-Greenery p-3'>Explore More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CorporateGiftingComponent
