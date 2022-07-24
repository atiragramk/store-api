import express from "express";
import CartController from "../controllers/cart.controller";
import CartService from "../services/cart.service";
import Cart from "../models/cart.model";
import Payment from "../models/payment.model";
import Products from "../models/products.model";

const cartController = new CartController(
  new CartService(new Cart(), new Payment(), new Products())
);

const router = express.Router();

router.get("/:id", cartController.getCartById.bind(cartController));
router.post("/", cartController.createOrder.bind(cartController));
router.delete("/:id", cartController.cancelOrder.bind(cartController));
router.patch("/:id", cartController.updateOrder.bind(cartController));

export default router;
