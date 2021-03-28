import mongoose from "mongoose";
const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const potsSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true
        },
        dimensions: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true,
        },
        images: {
            type: Array
        },
        description: {
            type: String,
            required: true,
        },
        reviews: [reviewSchema],
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        orders: {
            type: Number,
        },
        views: {
            type: Number,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
        defaultLink: {
            type: String,
        },
        colors: [
            {
                type: mongoose.Schema.Types.ObjectId, ref: "Color",

            },
        ],
        tags: [{ type: String, unique: true }],
        sortBy:{type:Number}

    },
    {
        timestamps: true,
    }
);

const Pot = mongoose.model("Pot", potsSchema);

export default Pot;
