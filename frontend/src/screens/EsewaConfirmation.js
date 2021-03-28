import React, { useEffect } from 'react'
import axios from 'axios'
const EsewaConfirmation = ({ location }) => {

    const locationId = location.search ? location.search : ""
    console.log(locationId)
    const arrayOfIds = location.search ? locationId.split('&') : null
    const pid = arrayOfIds ? arrayOfIds[0].split('=')[1] : null
    const amt = arrayOfIds ? Number(arrayOfIds[1].split('=')[1]) : null
    const refId = arrayOfIds ? arrayOfIds[2].split('=')[1] : null
    console.log(pid, amt, refId)

    
    useEffect(() => {
       
        var params = {
            amt,
            rid: refId,
            pid,
            scd: 'EPAYTEST'
        }

        axios.post('/api/payment/esewaVerification', params).then((res)=>console.log(res.data))
    }, [amt, pid, refId]) //eslint-disable-line
    return (
        <div class="alert alert-success" role="alert">
            Congrats your order has been paid
        </div>
    )
}

export default EsewaConfirmation
