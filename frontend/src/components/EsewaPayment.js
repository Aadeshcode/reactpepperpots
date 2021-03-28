import React from 'react'

const EsewaPayment = ({ location , cart }) => {
    var path = "https://uat.esewa.com.np/epay/main";
    var params = {
        amt: 100,
        psc: 0,
        pdc: 0,
        txAmt: 0,
        tAmt: 100,
        pid: Date.now(),
        scd: "EPAYTEST",
        su: "http://localhost:3000/esewa/success",
        fu: "http://merchant.com.np/page/esewa_payment_failed"
    }

    function post(path, params) {
        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);

        for (var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit();
    }

   


    return (
        <div>
            <button className='btn btn-Greenery btn-block rounded' onClick={() => post(path, params)}  >Pay wth Esewa</button>
        </div >
    )
}

export default EsewaPayment
