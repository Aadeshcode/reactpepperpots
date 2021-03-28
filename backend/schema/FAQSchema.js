import mongoose from "mongoose";

const faqSchema = mongoose.Schema(
    {
       
        category: { type: String, required: true },
        question: { type: String, required: true },
        answer: { type: String, required: true },

    },
    {
        timestamps: true,
    }
);

const FAQ = mongoose.model("FAQ", faqSchema);

export default FAQ;
