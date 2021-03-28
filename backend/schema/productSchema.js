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

const productSchema = mongoose.Schema(
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
    availablePots: [
      {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Pot"

      }
    ],

    light: {
      type: String,
      required: true
    },
    water: {
      type: String,
      required: true
    },
    pets: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true,
    },
    displayImages: {
      type: Array
    },
    images: { type: Object },

    genericName: {
      type: String,
      required: true
    },
    family: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
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
    tags: [{ type: String, unique: true }],
    sortBy: { type: Number }
  },

  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
