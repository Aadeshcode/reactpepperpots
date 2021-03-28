
import express from "express";
import { authUser, listUser, memberCheck, memberUpdate, userRegister, verifyEmail } from "../controllers/userController.js";
import { admin, protect } from "../middleware/auth.js";
const router = express();

router.route("/register").post(userRegister);
router.route("/login").post(authUser);
router.route("/").get(protect, admin, listUser);
router.route("/verify").put(protect, verifyEmail);
router.route("/membership").put(protect, memberUpdate).get(protect, memberCheck);


export default router