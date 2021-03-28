import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
const PaymentMethod = ({ history }) => {
    const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery")
    
    const dispatch = useDispatch()
    const savePaymentHandler = () => {
        dispatch(savePaymentMethod(paymentMethod))
        if (paymentMethod) {
            history.push('/order')
        }
    }
    return (
        <div className="container justify-content-center">
            <div className='row justify-content-center'>
                <h1>Payment Method</h1>
            </div>

            <div className="row flex-column justify-content-center align-items-center">
                <h2>Select Method</h2>

                <div className='col-5'>

                    <div class="custom-control custom-radio">
                        <button className='btn btn-block  p-3 bordered btn-outline-dark my-2 paymentButtonsKhalti  ' onClick={() => setPaymentMethod("KHALTI")}>Khalti</button>
                    </div>
                    <div class="custom-control custom-radio">
                        <button className='btn btn-block  p-3 bordered  btn-outline-dark my-2 paymentButtons' onClick={() => setPaymentMethod("EBANKING")}>EBanking</button>
                    </div>
                    <div class="custom-control custom-radio">
                        <button className='btn btn-block  p-3 bordered  btn-outline-dark my-2 paymentButtons' onClick={() => setPaymentMethod("CONNECT_IPS")}>Connect Ips</button>
                    </div>
                    <div class="custom-control custom-radio">
                        <button className='btn btn-block  p-3 bordered  btn-outline-dark my-2 paymentButtons' onClick={() => setPaymentMethod("MOBILE_BANKING")}> Mobile Banking</button>
                    </div>
                    <div class="custom-control custom-radio">
                        <button className='btn btn-block  p-3 bordered btn-outline-dark my-2 paymentButtons' onClick={() => setPaymentMethod("Cash On Delivery")}>Cash On Delivery</button>
                    </div>
                </div>

                <div>
                    <button className='btn btn-Greenery p-3 mt-3' onClick={savePaymentHandler}>Continue</button>
                </div>
            </div>

        </div>
    )
}

export default PaymentMethod
