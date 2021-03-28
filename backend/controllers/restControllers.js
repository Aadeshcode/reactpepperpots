import Rest from "../schema/restSchema.js"
import asyncHandler from 'express-async-handler'
export const addRest = asyncHandler(async (req, res) => {
    try {
        const newRest = new Rest({
            contactUs: "",
            aboutUs: "",
            termsAndConditions: "",
            shippingPolicy: "",
            refundPolicy: "",
            privacyPolicy: ""
        })
        const createdRest = await newRest.save()
        if (createdRest) {
            res.json(createdRest)
        }
    } catch (error) {
        res.send(error.message)
    }
})




export const updateRest = asyncHandler(async (req, res) => {
    try {
        const rest = await Rest.findOne({})
console.log(req.params.field , req.body.updateData)
        if (rest) {
            rest[req.params.field] = req.body.updateData
            const updatedRest = await rest.save()
            res.send(updatedRest)
        } else {
            res.send('Cannot update')
        }
    } catch (error) {
        res.send(error.message)
    }
})
export const deleteRest = asyncHandler(async (req, res) => {
    try {
        const rest = await Rest.findOne({})

        if (rest) {
            await rest.remove()
            res.json("removed")
        } else {
            res.send('Cannot Delete')
        }
    } catch (error) {
        res.send(error.message)
    }
})

export const getRest = asyncHandler(async (req, res) => {
    try {
        const rest = await Rest.findOne({})
        if (rest) {
            res.json(rest)
        } else {
            res.send("not found")
        }
    } catch (error) {
        res.status(400)
        throw new Error("Not Found")
    }
})
export const getOneRest = asyncHandler(async (req, res) => {
    const field = req.params.field
    try {
        const rest = await Rest.findOne({})
        if (rest) {
            res.json(rest[field])
        } else {
            res.send("not found")
        }
    } catch (error) {
        res.status(400)
        throw new Error("Not Found")
    }
})