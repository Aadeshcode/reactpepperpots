import React from 'react'
import one from './pics/office.jpg'
const GiftLeaflet = () => {
    return (
        <>
            <div className='row align-items-center mt-4'>
                <div className='col-md-6 col-12 '>
                    <img src={one} alt='one' class='img-fluid' />
                </div>
                <div className='col-md-6 col-12'>
                    <div className='d-flex align-items-center justify-content-center flex-column'>

                        <h1>Gift plants to Your Loved ones</h1>
                        <p className='text-center'>Now You can directly send your gifts to the ones you love
                        All you need to do is check the gift option, type your message
                          and we will make sure the package is delived to the concerned person</p>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default GiftLeaflet
