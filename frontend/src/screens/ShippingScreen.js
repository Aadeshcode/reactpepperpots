import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
const ShippingScreen = ({ history }) => {

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState('Nepal')//eslint-disable-line
    const [phone, setPhone] = useState(shippingAddress.phone)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        if (!city) {
            setCity(1)
        }
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country, phone }))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1 >Shipping</h1>
            <Form onSubmit={submitHandler} className='mb-2'>
                <Form.Group controlId='phone'>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter phone'
                        value={phone}
                        required
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength='13'
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" type='text'
                        placeholder='Enter city'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        value='Nepal'
                        required

                        disabled
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' className='btn-Greenery p-3'>
                    Continue
        </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
