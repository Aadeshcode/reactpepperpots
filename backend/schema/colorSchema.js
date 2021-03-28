import mongoose from "mongoose";

const colorSchema = mongoose.Schema(
    {
        color: { type: String, required: true },
        colorCode: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

const Color = mongoose.model("Color", colorSchema);

export default Color;
