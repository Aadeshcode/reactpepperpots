import mongoose from 'mongoose'

const restSchema = mongoose.Schema(
    {

        contactUs: {
            type: String
        },
        aboutUs: {
            type: String
        },
        shippingPolicy: {
            type: String
        },
        refundPolicy: {
            type: String
        },
        termsAndConditions: {
            type: String
        },
        privacyPolicy: {
            type: String
        },
        membership: {
            type: Object
        },
        career: {
            type: String
        }

    })


const Rest = mongoose.model("Rest", restSchema);

export default Rest;