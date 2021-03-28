import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Head from 'next/head'
import { useDispatch } from 'react-redux';
import { createOrder } from '../actions/orderActions';
import cogoToast from 'cogo-toast';
import { userMembershipEdit } from '../actions/userActions';

const KhaltiPayment = ({ cart, method, membership, buttonText, alreadyMember }) => {
    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()
    // useEffect(() => {

    //     const addKhaltiScript = async () => {

    //         const script = document.createElement('script')
    //         script.type = 'text/javascript'
    //         script.src="https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iffe.js"
    //         script.async = true
    //         script.onload = () => {
    //             setSdkReady(true)
    //         }
    //         document.body.appendChild(script)
    //     }

    // }, [dispatch])

    // let config = {
    //     // replace this key with yours
    //     "publicKey": "test_public_key_ec71b08cef954545916d142e49099795",
    //     "productIdentity": Date.now(),
    //     "productName": "unique order",
    //     "productUrl": "http://localhost:3000/product/plant/600c4ba468a46d2f145ecf71?pot=600c4a3b68a46d2f145ecf69",
    //     "eventHandler": {
    //         onSuccess(payloadToken) {

    //             if (membership) {

    //                 let data = {
    //                     "token": payloadToken.token,
    //                     "amount": 1000 * 100
    //                 };

    //                 let config = {
    //                     headers: { 'Authorization': 'Key test_secret_key_9a875a0a6bd8477bbc1ce5b244037b02' }
    //                 };

    //                 axios.post("/api/payment/khaltiVerification", { data, config })
    //                     .then(response => {

    //                         dispatch(userMembershipEdit())

    //                     })
    //                     .catch(error => {
    //                         console.log(error);
    //                         cogoToast.error(error)
    //                     });

    //             } else {

    //                 let data = {
    //                     "token": payloadToken.token,
    //                     "amount": cart.totalPrice * 100
    //                 };

    //                 let config = {
    //                     headers: { 'Authorization': 'Key test_secret_key_9a875a0a6bd8477bbc1ce5b244037b02' }
    //                 };

    //                 axios.post("/api/payment/khaltiVerification", { data, config })
    //                     .then(response => {
    //                         const { data } = response
    //                         dispatch(
    //                             createOrder({
    //                                 orderItems: cart.cartItems,
    //                                 shippingAddress: cart.shippingAddress,
    //                                 paymentMethod: cart.paymentMethod,
    //                                 itemsPrice: cart.itemsPrice,
    //                                 shippingPrice: cart.shippingPrice,
    //                                 taxPrice: cart.taxPrice,
    //                                 totalPrice: cart.totalPrice,
    //                                 isPaid: true,
    //                                 giftMessage: cart.giftMessage,
    //                                 paymentResult: {
    //                                     id: data.idx,
    //                                     type: data.type.name,
    //                                     status: data.state.name,
    //                                     update_time: data.created_on,
    //                                     user: data.user
    //                                 },

    //                             })
    //                         )

    //                         //end

    //                     })
    //                     .catch(error => {
    //                         console.log(error);
    //                         cogoToast.error(error)
    //                     });
    //             }
    //         },
    //         // onError handler is optional
    //         onError(error) {
    //             // handle errors
    //             console.log(error);
    //         },
    //         onClose() {
    //             console.log('widget is closing');
    //         }
    //     },
    //     "paymentPreference": membership ? method : [`${method}`],
    // };

    // // "KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"
    // let checkout = new KhaltiCheckout(config);


    return (
        <div>
            <Head>
                <head>
                    <script src="https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iffe.js"></script>
                </head>
            </Head>
            {/* <button className='btn btn-Greenery btn-block rounded' disabled={alreadyMember} onClick={() => membership ? checkout.show({ amount: 1000 * 100 }) : checkout.show({ amount: cart.totalPrice * 100 })}>{buttonText}</button> */}
        </div >
    )
}

export default KhaltiPayment
