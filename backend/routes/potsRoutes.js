import express from "express";
import {
    deletePots,
    getPots,
    createOrUpdatePot,
    getOnePot,
    getAllPots,
    getOnePotType,
    createPotReview,
    potsYouMightLike

} from "../controllers/potsController.js";
import { admin, protect } from "../middleware/auth.js";
const router = express();


router.route("/").get(getPots).post(createOrUpdatePot);
router.get('/all', getAllPots)

router.route("/:id").put(createOrUpdatePot).delete(protect, admin, deletePots).get(getOnePot);
router.route("/details/:slug").get(getOnePotType);
router.route('/:id/reviews').post(protect, createPotReview)
router.route("/suggestions/mightlike").get(potsYouMightLike)
export default router;
