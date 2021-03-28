import Color from "../schema/colorSchema.js";
import asyncHandler from "express-async-handler";

const createColor = asyncHandler(async (req, res) => {
    try {
        const { color, colorCode } = req.body
        const newColor = new Color({
            color,
            colorCode
        })
        const savedColor = await newColor.save()
        res.json(savedColor)
    } catch (error) {
        res.status(401)
        throw new Error(error)
    }
})

const updateColor = asyncHandler(async (req, res) => {
    try {
        const { colorCode, color } = req.body
        const requiredColor = await Color.findById(req.params.id)
        requiredColor.color = color;
        requiredColor.colorCode = colorCode;
        const savedColor = await requiredColor.save()
        res.send(savedColor)
    } catch (error) {
        res.status(401)
        throw new Error(error)
    }
})

const getOneColor = asyncHandler(async (req, res) => {
    try {
        const requiredColor = await Color.findById(req.params.id)
        if (requiredColor) {
            res.send(requiredColor)
        } else { res.send("not Found") }
    } catch (error) {
        res.status(401)
        throw new Error(error)
    }
})

const getColors = asyncHandler(async (req, res) => {
    try {
        const colors = await Color.find({})
        res.send(colors)
    } catch (error) {
        res.status(401)
        throw new Error(error)
    }
})

const deleteColors = asyncHandler(async (req, res) => {
    try {
        const colors = await Color.findById(req.params.id)
        if (colors) {
            colors.remove()
            res.json("Color Removed")
        }
    } catch (error) {
        res.status(401)
        throw new Error(error)
    }
})

export { createColor, updateColor, getOneColor, getColors, deleteColors }