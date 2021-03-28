import express from "express";
import {
  addCoupon,
  couponAddUser,
  deleteCoupons,
  editCoupons,
  getCoupon,
  getCoupons,
} from '../controllers/couponController.js';
import { member, protect } from "../middleware/auth.js";
const router = express();

router.route("/").post(addCoupon).get(protect, getCoupons);
router.route("/:id").put(protect, couponAddUser)
router.route("/:code").put(editCoupons).delete(deleteCoupons).get(protect, getCoupon);

export default router;
