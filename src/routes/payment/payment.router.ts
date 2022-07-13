import express from "express";
import paymentController from "../../controllers/payment.controller";


const router = express.Router();

router.patch('/:id', paymentController.createPayment.bind(paymentController));

export default router;
