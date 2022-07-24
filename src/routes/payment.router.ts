import express from "express";
import PaymentController from "../controllers/payment.controller";
import Cart from "../models/cart.model";
import Payment from "../models/payment.model";
import PaymentService from "../services/payment.service";

const paymentController = new PaymentController(
  new PaymentService(new Cart(), new Payment())
);

const router = express.Router();

router.patch("/:id", paymentController.updatePayment.bind(paymentController));

export default router;
