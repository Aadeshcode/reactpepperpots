import mongoose from 'mongoose'

const cartSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        qty: { type: Number, required: true, default: 1 },
        selectedPot: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Pot',
        },
        selectedColor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Color',
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        price: {
            type: Number,
            required: true
        },
        selected: {
            type: Boolean,
            required: true.selectedPot,
            default: false
        }


    })


const Cart = mongoose.model("Cart", cartSchema);

export default Cart;