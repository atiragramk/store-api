import express from "express";

import cart from "./cart.router";

const router = express.Router();

router.use("/cart", cart);

export default router;
