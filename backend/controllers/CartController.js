import expressAsyncHandler from "express-async-handler";
import Cart from "../schema/cartSchema.js";
import Product from "../schema/productSchema.js";
import Pot from "../schema/potsSchema.js";


export const addtoCart = expressAsyncHandler(async (req, res) => {
    const {
        product,
        selectedPot,
        selectedColor,
        qty
    } = req.body

    const plantPrice = await Product.findById(product).select('price')
    const potPrice = await Pot.findById(selectedPot).select('price')
    const price = plantPrice ? plantPrice.price + potPrice.price : potPrice.price
    const query = product ? { 'product': product, 'selectedPot': selectedPot, 'selectedColor': selectedColor } : { 'selectedPot': selectedPot, 'selectedColor': selectedColor }

    const user = await Cart.findOneAndUpdate(query, { product, selectedPot, selectedColor, price, qty, user: req.user }, { upsert: true, useFindAndModify: false, new: true })

    res.json(user)
})

export const getCart = expressAsyncHandler(async (req, res) => {
    const cartItems = await Cart.find({ user: req.user }).populate('product', 'name  image price countInStock type').populate('selectedPot', 'name image price size countInStock slug').populate('selectedColor', 'color colorCode')
    res.json(cartItems)
})

export const deleteCartItem = expressAsyncHandler(async (req, res) => {
    const cartItems = await Cart.findOne({ _id: req.params.id, user: req.user })

    if (cartItems) {
        cartItems.remove()
        res.json("Product removed");
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
})

export const updateSelected = expressAsyncHandler(async (req, res) => {
    const cartItems = await Cart.findById(req.params.id)
    cartItems.selected = req.body.selected
    await cartItems.save()
    res.json("Updated")
})

export const clearCart = expressAsyncHandler(async (req, res) => {
    await Cart.deleteMany({ user: req.user })
    res.send("Cart Cleared")
})

