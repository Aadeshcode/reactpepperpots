import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { removeFromCart, addToCart, saveGiftMessage } from '../actions/cartActions'
import GiftLeaflet from '../components/GiftLeaflet'
const Cart = ({ history, store }) => {

    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems, loading, error, giftMessage } = cart

    const [textAreaContent, setTextAreaContent] = useState()
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        checked ? dispatch(saveGiftMessage(textAreaContent)) : dispatch(saveGiftMessage(null))
        history.push('/login?redirect=shipping')
    }
    useEffect(() => {
        if (giftMessage) { setTextAreaContent(giftMessage) }
    }, [giftMessage])

    return error ? <Message variant="danger" message={error} /> : (
        <div className='container'>
            <Row>
                <Col md={store ? 12 : 8} className='p-2 p-md-5 cartWrapper'>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <>
                            <Message message="Your cart is empty" variant="warning" />
                            <Link to='/store'>Go Back</Link>

                        </>) : (
                        <ListGroup >
                            {cartItems.map((item) => (
                                <ListGroup.Item>
                                    <Row className='align-items-center'>

                                        <div className='col-sm-2 col-6 '>
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
                                        <div className='col-sm-2 col-6'>
                                            {item.product ? <Form.Control
                                                as='select'
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart({
                                                            product: item.product ? item.product._id : "",
                                                            selectedPot: item.selectedPot._id,
                                                            selectedColor: item.selectedColor._id,
                                                            qty: e.target.value
                                                        })
                                                    )

                                                }
                                            >
                                                {[...Array(Math.max(item.product.countInStock, item.selectedPot.countInStock)).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control> : <Form.Control
                                                as='select'
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart({
                                                            selectedPot: item.selectedPot._id,
                                                            selectedColor: item.selectedColor._id,
                                                            qty: e.target.value
                                                        })
                                                    )

                                                }
                                            >
                                                {[...Array(item.selectedPot.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>}
                                        </div>
                                        <div className='col-sm-2 col-3'>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item._id)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </div>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={store ? 12 : 4}>
                    <Card>
                        <ListGroup variant='flush' className='cartWrapper p-1 p-md-3 border-none'>
                            <ListGroup.Item>
                                <h1>
                                    Subtotal {loading ? <div class="spinner-border spinner-border-sm mb-1" role="status" aria-hidden="true"></div> :
                                        <span>({cartItems.reduce((acc, item) => acc + item.qty, 0)}) </span>}
                      items
                    </h1>

                                {loading ? <div class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></div> : <p>Rs.{cartItems
                                    .reduce((acc, item) => item.potId ? acc + item.qty * (item.price + item.potPrice) : acc + item.qty * (item.price), 0)
                                    .toFixed(2)}</p>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <div className='row flex-column justify-content-center text-center'>
                                    <div className='col'>
                                        <h1>Is this a Gift?</h1>
                                    </div>
                                    <div className='col'>
                                        <form>
                                            <input type='checkbox' className='form-check-input mr-1' id='gift'
                                                onChange={(e) => setChecked(e.target.checked)}

                                            />
                                            <label htmlFor="gift">Yes, Include my gift note below</label>
                                        </form>
                                    </div>
                                    {checked ? <div class="form-group">

                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1">Gift Message</label>
                                            <textarea
                                                style={{ lineHeight: "20px" }}
                                                placeholder="Don’t forget to sign your message so the recipient knows who the gift is from! (max 250 characters)"
                                                maxLength='250'
                                                rows='5'
                                                class="form-control" id="exampleFormControlTextarea1"
                                                onChange={(e) => setTextAreaContent(e.target.value)}
                                                value={textAreaContent}
                                            ></textarea>
                                        </div>
                                    </div> : ""}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block btn-Greenery'
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceed To Checkout
                    </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <GiftLeaflet />


        </div>
    )
}

export default Cart
