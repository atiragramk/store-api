import express from "express";
import cartController from "../controllers/cart.controller";

const router = express.Router();

router.post("/", cartController.createOrder.bind(cartController));
router.delete("/:id", cartController.cancelOrder.bind(cartController));
router.patch("/:id", cartController.updateOrder.bind(cartController));

export default router;
