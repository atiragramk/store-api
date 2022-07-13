import express from "express";

import user from "./user.router";

const router = express.Router();

router.use("/user", user);

export default router;
