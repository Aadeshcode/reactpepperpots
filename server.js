import express from "express";
import connectDB from "./backend/config/db.js";
import { errorHandler, notFound } from "./backend/middleware/errorHandler.js";
import userRoutes from "./backend/routes/userRoutes.js";
import productRoutes from "./backend/routes/productRoutes.js";
import potsRoutes from "./backend/routes/potsRoutes.js";
import orderRoutes from "./backend/routes/orderRoutes.js";
import cartRoutes from "./backend/routes/cartRoutes.js";
import colorRoutes from "./backend/routes/colorRoutes.js";
import uploadRoutes from "./backend/routes/uploadRoutes.js"
import FAQRoutes from "./backend/routes/FAQRoutes.js"
import blogRoutes from "./backend/routes/blogRoutes.js"
import paymentRoutes from "./backend/routes/paymentRoutes.js"
import wholesaleRoutes from "./backend/routes/wholesaleRoutes.js"
import couponRoutes from "./backend/routes/couponRoutes.js"
import restRoutes from "./backend/routes/restRoutes.js"
const app = express();
app.use(express.json());
connectDB();

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/pots", potsRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/color", colorRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/image", uploadRoutes);
app.use("/api/faq", FAQRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/wholesale", wholesaleRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/rest", restRoutes);
app.use(errorHandler);
app.use(notFound);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("The server has Started..."));
