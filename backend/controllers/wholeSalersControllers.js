import expressAsyncHandler from "express-async-handler";
import WholeSale from "../schema/wholesalersSchema.js";

export const addWholeSalers = expressAsyncHandler(async (req, res) => {
    try {
        const { organisation, message, phone } = req.body
      
        const wholesale = new WholeSale({
            organisation,
            message,
            phone
        })
        const newWholesaler = await wholesale.save()
        res.json(newWholesaler)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

export const getWholeSalers = expressAsyncHandler(async (req, res) => {
    try {
        const wholesaler = await WholeSale.find()
        res.json(wholesaler)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})