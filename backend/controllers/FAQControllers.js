import expressAsyncHandler from "express-async-handler";
import FAQ from "../schema/FAQSchema.js";

export const faqCreate = expressAsyncHandler(async (req, res) => {
    try {
        const { category, question, answer } = req.body
        const createdFaq = new FAQ({
            category, question, answer
        })

        const faq = await createdFaq.save()
        res.send(faq)
    } catch (error) {
        res.status(400)
        throw new Error("Something Went wrong")
    }
})

export const getFaqs = expressAsyncHandler(async (req, res) => {
    try {
        const faqs = await FAQ.find({})
        res.send(faqs)
    } catch (error) {
        res.status(400)
        throw new Error("Something Went wrong")
    }
})

export const deleteFaqs = expressAsyncHandler(async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id)
        if (faq) {
            faq.remove()
            res.send("Product removed")
        }
        else {
            res.send("FAQ not found")
        }
    } catch (error) {
        res.status(400)
        throw new Error("Something Went wrong")
    }
})


export const updateFaqs = expressAsyncHandler(async (req, res) => {
    try {
        const { category, question, answer } = req.body
        const faq = await FAQ.findById(req.params.id)
        if (faq) {
            faq.category = category
            faq.question = question
            faq.answer = answer

            await faq.save()
            res.send("FAQ Updated")
        }
        else {
            res.send("FAQ not found")
        }
    } catch (error) {
        res.status(400)
        throw new Error("Something Went wrong")
    }
})

export const getFaqDetails = expressAsyncHandler(async (req, res) => {
    try {

        const faq = await FAQ.findById(req.params.id)
        if (faq) {
            res.send(faq)
        }
        else {
            res.send("FAQ not found")
        }
    } catch (error) {
        res.status(400)
        throw new Error("Something Went wrong")
    }
})