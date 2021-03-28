import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Not Provided"
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false
    },
    isMember: {
      type: Boolean,
      default: false
    },
    membershipDate: {
      type: Date
    },
    cart: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        selectedPot: { type: String },
        selectedSize: { type: String },
        selectedColor: { type: String },
        image: { type: String, required: true },
        price: { type: Number, required: true },

      },
    ],
    wishList: {
      type: mongoose.Types.ObjectId,
      ref: "Product"
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
