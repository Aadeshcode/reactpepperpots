import mongoose from "mongoose";

const wholesalersSchema = mongoose.Schema(
    {
       
        organisation: { type: String },
        phone: { type: String, required: true },
        message: { type: String, required: true },

    },
    {
        timestamps: true,
    }
);

const WholeSale = mongoose.model("WholeSale", wholesalersSchema);

export default WholeSale;
