import React from 'react'
import RatingComponent from './RatingComponent'
const ProductReviewStarsComponent = ({ rating, numReviews, reviews }) => {
    console.log(reviews)

    return (
        <div className='container-fluid my-2'>
        <h1>Reviews</h1>
            <div className='row p-md-3 p-2 bg-custom-white rounded border-0 align-items-center'>
                <div className='col-12 col-md-6'>

                    <div className='d-flex flex-column text-center'>
                        <h1 className='m-0 p-1'>{`${rating}/5`}</h1>
                        <RatingComponent value={rating} size="2rem" />
                        <p className='p-1'>{`${numReviews} Reviews`}</p>
                    </div>
                </div>
                <div className='col-12 col-md-4 p-0 p-md-1'>

                    <div className='d-flex flex-column justify-content-between'>
                        {[5, 4, 3, 2, 1].map((x) =>
                            <div className='d-flex justify-content-center align-items-center  '>
                                <span className='p-2'>{x}</span>
                                <i
                                    style={{ color: '#ffaa45', fontSize: '1.5rem' }}
                                    className='fas fa-star p-2'
                                ></i>
                                <div className=' overflow-hidden ratingShowerWrapper'>
                                    <div className='ratingShower '

                                        style={reviews.length > 0 ? { width: `${reviews.filter((y) => y.rating === x).length / reviews.length * 100}%` } : { width: '0px' }}>
                                    </div>
                                </div>
                                <div className='m-2'>
                                    <p>({reviews ? reviews.filter((y) => y.rating === x).length : 0})</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductReviewStarsComponent
