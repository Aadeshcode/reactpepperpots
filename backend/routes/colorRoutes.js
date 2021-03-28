import express from "express";
import { createColor, deleteColors, getColors, getOneColor, updateColor } from "../controllers/colorController.js";
import { admin, protect } from "../middleware/auth.js";
const router = express();


router.route("/").get(getColors).post(createColor);
router.route("/:id").put(updateColor).delete(deleteColors).get(getOneColor);

export default router;
