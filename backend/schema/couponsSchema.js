import mongoose from "mongoose";

const couponsSchema = mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,

        },
        discount: {
            type: Number,
            required: true,

        },
        onlyForMembers: {
            type: Boolean
        },
        giver: {
            type: String,
        },
        expiry: {
            type: Date,
        },
        image: {
            type: String
        },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

    },
    {
        timestamps: true,
    }
);

const Coupon = mongoose.model("Coupon", couponsSchema);

export default Coupon;
