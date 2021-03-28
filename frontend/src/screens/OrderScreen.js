import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, updateOrderToDelivered, updateOrderToDispatched, updateOrderToPaid } from '../actions/orderActions'

const OrderScreen = ({ match }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const { loading: deliverLoading, success: deliverSuccess } = useSelector(state => state.orderDelivered)
  const { loading: dispatchLoading, success: dispatchSuccess } = useSelector(state => state.orderDispatched)
  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId, dispatchSuccess, deliverSuccess])

  return loading || dispatchLoading || deliverLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger' message={error} />
  ) : (
        <div className='container'>

          <Row className='justify-content-center'>
            <Col md={8}>
              <h1 className='d-none d-md-block'>Order No. {order._id}</h1>
              <h4 className='d-md-none d-none d-sm-block text-center'>Order No.  {order._id}</h4>
              <h4 className='d-sm-none d-block p-2 text-center'>Order No.  {order._id}</h4>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                      <ListGroup variant='flush'>
                        {order.orderItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row className='align-items-center'>

                              <div className='col-sm-2 col-6 '>
                                {item.product ? <Image src={`https://hopeplants.s3.ap-south-1.amazonaws.com${item.product.image}`} alt={item.productname} fluid rounded /> :
                                  <Image src={`https://hopeplants.s3.ap-south-1.amazonaws.com${item.selectedPot.image}`} alt={item.selectedPot.name} fluid rounded />}
                              </div>

                              <div className='col-sm-3 col-6'>
                                {item.product ? <Link to={`/product/plant/${item.product._id}?pot=${item.selectedPot._id}`}><p>{item.product.name}</p></Link> : ""}
                                <Link to={`/product/pot/${item.selectedPot.slug}?variant=${item.selectedPot._id}`}><p>{item.selectedPot.name}</p></Link>
                                <div className='d-flex align-items-center'>
                                  <p className='mr-2'>{item.selectedColor.color}</p>
                                  <p className={`circleSmall`} style={{ backgroundColor: `${item.selectedColor.colorCode}` }}></p>
                                </div>
                                <p>{item.selectedPot.size}</p>

                              </div>

                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                </ListGroup.Item>



                <ListGroup.Item>
                  <div clasName='d-flex justify-content-start'>
                    <h2>Order Summary</h2>
                  </div>


                  <Row>
                    <Col><p>Items Price</p></Col>
                    <Col><p>Rs.{order.itemsPrice}</p></Col>
                  </Row>


                  <Row>
                    <Col><p>Shipping</p></Col>
                    <Col><p>Rs.{order.shippingPrice}</p></Col>
                  </Row>


                  <Row>
                    <Col><p >Tax</p></Col>
                    <Col><p>Rs.{order.taxPrice}</p></Col>
                  </Row>
                  {order.coupon ? <><Row>
                    <Col><p >Coupon</p></Col>
                    <Col><p>Rs.{order.coupon.code}</p></Col>
                  </Row>
                    <Row>
                      <Col><p >Discount</p></Col>
                      <Col><p>Rs.{order.coupon.discount}</p></Col>
                    </Row></> : ""}

                  <Row>
                    <Col><p>Total</p></Col>
                    <Col><p>Rs.{order.totalPrice}</p></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country},

              </p>
                  <p>
                    <strong>Phone:</strong>
                    {order.shippingAddress.phone}
                  </p>
                  {order.isDelivered ? (
                    <Message variant='success' message={`Delivered on  ${order.deliveredAt}`}>

                    </Message>
                  ) : (
                      <Message variant='danger' message="Not Delivered" />
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Dispatch</h2>
                  <p>
                    <strong>Status: </strong> {order.isDispatched ? "Dispatched" : "Not Dispatched Yet"}
                  </p>



                  {order.isDispatched ? (
                    <Message variant='success' message={order.dispatchedAt}>
                      Dispatched on {order.dispatchedAt}
                    </Message>
                  ) : (
                      <Message variant='danger' message="Not Dispatched" />
                    )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid && order.paymentMethod !=="Cash On Delivery" && <> <p>
                    <strong>ref-Id: </strong>
                    {order.paymentResult.user.idx}
                  </p>
                    <p>
                      <strong>status: </strong>
                      {order.paymentResult.status}
                    </p>
                    <p>
                      <strong>Payment Source </strong>
                      {order.paymentResult.user.name}
                    </p></>}
                  {order.isPaid ? (
                    <Message variant='success' message={`Paid on ${order.paidAt.substring(0, 10)}`} />
                  ) : (
                      <Message variant='danger' message="Not Paid" />
                    )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Gift?</h2>
                  <p>
                    <strong>Status: </strong>
                    {order.giftMessage ? "True" : "False"}
                  </p>
                  {order.giftMessage && <> <p>
                    <strong>Gift Message: </strong>
                    {order.giftMessage}
                  </p>
                  </>}
                  {order.giftMessage ? (
                    <Message variant='success' message="Your Order will be sent as a Gift
                    " />
                  ) : (
                      <Message variant='danger' message="Normal Order" />
                    )}
                  <ListGroup.Item>
                    <button className='btn btn-Greenery btn-block' disabled={order.isDispatched} onClick={() => dispatch(updateOrderToDispatched(order._id))} >Mark as Dispatched</button>
                    <button className='btn btn-Greenery btn-block' disabled={order.isDelivered} onClick={() => dispatch(updateOrderToDelivered(order._id))}>Mark as Delivered</button>
                    <button className='btn btn-Greenery btn-block'
                      disabled={order.paymentMethod === "Cash On Delivery" ? false : true}
                      onClick={() => dispatch(updateOrderToPaid({ _id: order._id, }))} >Mark as Paid</button>
                  </ListGroup.Item>
                </ListGroup.Item>







              </ListGroup>
            </Col>

          </Row>
        </div>
      )
}

export default OrderScreen
