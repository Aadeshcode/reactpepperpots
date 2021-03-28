import React, { useState } from 'react'
import { Form } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import {addWholesale} from '../actions/wholesaleActions'
import cogoToast from 'cogo-toast'
const WholeSalerScreen = () => {
    const [phone, setPhone] = useState("")
    const [nameOfOrganisation, setNameOfOrganisation] = useState("")
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
const submitWholesale = (e) =>{
    e.preventDefault()
    if(Number(phone)){
        dispatch(addWholesale({
            phone,
            organisation:nameOfOrganisation,
            message
            
        }))

        setPhone('')
        setNameOfOrganisation('')
        setMessage('')
    }else{
        cogoToast.error('Phone Number can only be numbers')
    }
    
}

   
    return (
        <div className='container-fluid'>

            <h1 className="fontXBig text-center">Own a business?</h1>
            <h1 className="text-center">Looking for pots suppliers?</h1>

            <div className='row'>
                <div className='col'>
                    {/* <img src={one} alt="wholesalers " className='img-fluid' /> */}
                </div>
            </div>
            <div className='row justify-content-center text-center ' >
                <div className='col-12 col-md-6'>
                    <p > If you are looking for a suppliers of pots on WholeSale price. You are in the correct page. 
                    We supply Pots online at lower rates. All you need to do is Contact us at this Number.  or you can email us at sales@pepperpots.com
                    
                    </p>
                    {/* <p >
                    The minimum order Quantity is Rs 8000
                    </p> */}
                    <p>or you can leave a Message here</p>
                    <div className='mt-3'>
                    <form onSubmit={submitWholesale}>
                    <Form.Group controlId="name">
                    <label className='fontPBold'>Phone Number (required)</label>
                    <Form.Control
                        type="tel"
                        placeholder="Enter Your Phone Number"
                        value={phone}
                        maxLength='10'
                        minLength='10'
                        required
                        onChange={(e) => setPhone(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                    <Form.Group controlId="name">
                    <label className='fontPBold'>Name Of Your Organisation</label>
                    <Form.Control
                        type="tel"
                        placeholder="Enter Your Organisation's name"
                        value={nameOfOrganisation}
                        maxLength='30'
                        onChange={(e) => setNameOfOrganisation(e.target.value)}
                    ></Form.Control>
                </Form.Group>
               
                    <Form.Group controlId="name">
                    <label className='fontPBold'>Leave Your Message Here(200 words max) (required)</label>
                    <Form.Control
                        type="tel"
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxlength={200}
                        required
                    ></Form.Control>
                </Form.Group>
            <button type='submit' className='btn btn-Greenery px-3 btn-block' >Submit</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WholeSalerScreen
