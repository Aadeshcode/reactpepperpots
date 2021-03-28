import React, { useState } from 'react'
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap'
import RatingComponent from './RatingComponent'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import { createProductReview } from '../actions/productActions'
import { createPotReview } from '../actions/potsActions'
const ReviewComponent = ({ product, loadingProductReview, successProductReview, errorProductReview, type }) => {
    const dispatch = useDispatch()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()

        type === "plant" ? dispatch(
            createProductReview(product._id, {
                rating,
                comment,
            })
        ) : dispatch(createPotReview(
            product._id,
            { rating, comment }
        ))
        setComment('')
        setRating('0')

    }
    const { userInfo } = useSelector(state => state.userLogin)
    return (
        <div className='container-fluid'>
            <Row>
                <Col md={12}>

                    {product.reviews.length === 0 && <Message message="No Reviews" variant='info' />}
                    <ListGroup variant='flush'>
                        {product.reviews.map((review) => (
                            <ListGroup.Item key={review._id} className='p-0 p-md-2 border-0'>
                                <div className='card p-3 border-0'>
                                    <p><strong>{review.name}</strong></p>
                                    <RatingComponent value={review.rating} />
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </div>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item className='px-0 px-md-2 '>
                            <h2>Write a Customer Review</h2>
                            
                            {loadingProductReview && <Loader />}
                            
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                            as='select'
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                        >
                                            <option value=''>Select...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                            as='textarea'
                                            row='3'
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Button
                                        disabled={loadingProductReview}
                                        type='submit'
                                        className='btn btn-Greenery p-3'
                                    >
                                        Submit
                      </Button>
                                </Form>
                            ) : (
                                    <Message message="Please <Link to='/login'>sign in to write a review" />


                                )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

        </div>
    )
}

export default ReviewComponent
