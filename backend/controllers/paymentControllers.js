import expressAsyncHandler from "express-async-handler";
import axios from 'axios'
export const khaltiVerification = expressAsyncHandler(async (req, res) => {

    const { data, config } = req.body
    axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
        .then(response => {

            res.json(response.data)
        })
        .catch(error => {
            console.log(error);
            res.json(error)
        });
})



export const esewaVerification = expressAsyncHandler(async (req, res) => {

    console.log("this is req")
    // axios({
    //     method: 'post',
    //     url: 'https://uat.esewa.com.np/epay/transrec',
    //     data: req.body,
    //     headers: { 'Content-Type': 'application/json' }
    // })
    //     .then(response => {

    //         res.json(response.data)
    //         console.log("Resp")
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         res.json(error)
    //     });
})