import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { clearCart } from '../actions/cartActions'
import cogoToast from 'cogo-toast'
import KhaltiPayment from '../components/KhaltiPayment'
import { addUserCoupons, coupongetReset, getCoupon } from '../actions/couponActions'
import ProductYouMightLikeComponent from '../components/ProductYouMightLikeComponent'
import PotsYouMightLikeComponent from '../components/PotsYouMightLikeComponent'


const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()
  const [coupon, setCoupon] = useState('')

  const cart = useSelector((state) => state.cart)
  const giftMessage = cart.giftMessage
  const { coupon: appliedCoupon, loading: couponLoading } = useSelector(state => state.couponsDetails)
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => item.product ? acc + item.product.price * item.qty + item.qty * item.selectedPot.price :
      acc + item.qty * item.selectedPot.price
      , 0)
  )
  cart.coupon = appliedCoupon._id
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 0)
  cart.taxPrice = addDecimals(Number((0 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    appliedCoupon.code ? Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice) - appliedCoupon.discount : Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
      dispatch(clearCart())

    }
    // eslint-disable-next-line
  }, [history, success])
  const placeOrderHandler = () => {
    try {

      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
          coupon: cart.coupon,
           giftMessage: cart.giftMessage,

          paymentResult: {
            id: "",
            type: "",
            status: "",
            update_time: "",
            user: { idx: "" }
          },
        })
      )
      dispatch(addUserCoupons(cart.coupon))

    } catch (error) {
      cogoToast.error(error)
    }
  }
  const applyCoupon = (e, code) => {
    e.preventDefault()
    dispatch(getCoupon(code))
  }
  useEffect(() => {

    return () => {
      dispatch(coupongetReset())
    }
  }, []) //eslint-disable-line
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>Method: </p>
              <p>{cart.paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Gift?</h2>
              <p>{`Status : ${cart.giftMessage ? true : false}`}</p>
              <p>{cart.giftMessage}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                  <ListGroup variant='flush'>
                    {cart.cartItems.map((item) => (
                      <ListGroup.Item className="p-0 p-md-2">
                        <Row className='align-items-center'>

                          <div className='col-sm-2 col-6'>
                            {item.product ? <Image src={`https://hopeplants.s3.ap-south-1.amazonaws.com${item.product.image}`} alt={item.productname} fluid rounded /> :
                              <Image src={`https://hopeplants.s3.ap-south-1.amazonaws.com${item.selectedPot.image}`} alt={item.selectedPot.name} fluid rounded />}
                          </div>

                          <div className='col-sm-3 col-3'>
                            {item.product ? <Link to={`/product/plant/${item.product._id}?pot=${item.selectedPot._id}`}><p>{item.product.name}</p></Link> : ""}
                            <Link to={`/product/pot/${item.selectedPot.slug}?variant=${item.selectedPot._id}`}><p>{item.selectedPot.name}</p></Link>
                            <div className='d-flex align-items-center'>
                              <p className='mr-2'>{item.selectedColor.color}</p>
                              <p className={`circleSmall`} style={{ backgroundColor: `${item.selectedColor.colorCode}` }}></p>
                            </div>
                            <p>{item.selectedPot.size}</p>

                          </div>
                          <div className='col-sm-2 col-3'><p>Rs.{item.price}</p></div>

                          {item.product ? <Col md={4} sm={5} className='text-center mt-1 mt-sm-0'>
                            <p> {item.qty} x Rs.{item.product.price} + {item.qty} x Rs.{item.selectedPot.price} = Rs.{item.qty * item.product.price + item.qty * item.selectedPot.price}
                            </p> </Col> : <Col md={4}>
                              <p> {item.qty} x Rs.{item.selectedPot.price}  = Rs.{item.qty * item.selectedPot.price}</p>
                            </Col>}
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 className='text-center'>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='text-center'><p>Items</p></Col>
                  <Col className='text-center'><p>Rs.{cart.itemsPrice}</p></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='text-center'><p>Shipping</p></Col>
                  <Col className='text-center'><p>Rs.{cart.shippingPrice}</p></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='text-center'><p>Tax</p></Col>
                  <Col className='text-center'><p>Rs.{cart.taxPrice}</p></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className='flex-column'>

                  <Col className='text-center'>
                    <Form onSubmit={(e) => applyCoupon(e, coupon)}>
                      <Form.Group controlId="name">
                        <Form.Label>Enter Coupon</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Coupon"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}

                        ></Form.Control>
                      </Form.Group>
                      <button className='btn btn-Greenery p-3 btn-block' type='submit'>Apply</button>
                    </Form>
                    <p className='text-danger'>{appliedCoupon.error}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='text-center'><p>Discount</p></Col>
                  <Col className='text-center'><p>Rs.{appliedCoupon.code ? appliedCoupon.discount : 0}</p></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='text-center'><p className='fontPBold'>Total</p></Col>
                  <Col className='text-center'>
                    {couponLoading ? <div class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
                      : <p className='fontPBold'>Rs.{cart.totalPrice}</p>}
                  </Col>
                </Row>
              </ListGroup.Item>

              {error && <ListGroup.Item><Message variant='danger' message={error} /></ListGroup.Item>}

              <ListGroup.Item>
                {cart.paymentMethod === "Cash On Delivery" ?
                  <Button
                    type='button'
                    className='btn-block btn-Greenery'
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                </Button> : (
                    <ListGroup.Item>
                      <KhaltiPayment cart={cart} method={cart.paymentMethod} buttonText='Pay Now' />
                    </ListGroup.Item>
                  )}

              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <div>
        <ProductYouMightLikeComponent />
      </div>
      <div>
        <PotsYouMightLikeComponent />
      </div>
    </>
  )
}

export default PlaceOrderScreen
