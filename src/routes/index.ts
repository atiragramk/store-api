import express from "express";
import user from "./user.router";
import product from "./products.router";
import payment from "./payment.router";
import cart from "./cart.router";

const router = express.Router();

router.use("/user", user);
router.use("/products", product);
router.use("/payment", payment);
router.use("/cart", cart);

export default router;
