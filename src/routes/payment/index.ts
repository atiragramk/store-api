import express from "express";

import payment from "./payment.router";

const router = express.Router();

router.use("/payment", payment);

export default router;