import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    console.log(step1, step2, step3, step4)
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <Link to='/login?redirect=shipping'>
                        <p  className='p-md-3 p-2' >Sign In</p>
                    </Link>
                ) : (
                        <p className='p-md-3 p-2'  disabled>Sign In</p>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <Link to='/shipping'>
                        <p className='p-md-3 p-2' >Shipping</p>
                    </Link>
                ) : (
                        <p  className='p-md-3 p-2' disabled>Shipping</p>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <Link to='/payment'>
                        <p className='p-md-3 p-2'>Payment</p>
                    </Link>
                ) : (
                        <p  className='p-md-3 p-2' disabled>Payment</p>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <Link to='/placeorder'>
                        <p className='p-md-3 p-2' >Place Order</p>
                    </Link>
                ) : (
                        <p className='p-md-3 p-2' disabled>Place Order</p>
                    )}
            </Nav.Item>
        </Nav>
    )
}
export default CheckoutSteps
