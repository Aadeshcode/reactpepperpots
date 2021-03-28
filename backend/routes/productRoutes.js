import express from "express";
import {
  deleteProducts,
  getProducts,
  createOrUpdateProduct,
  getOneProduct,
  getBestSellers,
  productsYouMightlike,
  createProductReview,
  updateSort,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/auth.js";
const router = express();


router.route("/").get(getProducts).post(createOrUpdateProduct);
router.route("/bestsellers").get(getBestSellers)
router.route("/suggestions").get(productsYouMightlike)
router.route("/:id").put(createOrUpdateProduct).delete(deleteProducts).get(getOneProduct);
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:sort/sort').put(updateSort)
export default router;
