import { Request, Response } from "express";
import { BasicController } from "./basic.controller";

import PaymentModel from "../models/payment.model";
import CartModel from "../models/cart.model";

import { PaymentStatus, CartStatus } from "../types";


class PaymentController extends BasicController {
  async createPayment(req: Request, res: Response) {
    try {
      const payment = await PaymentModel.findByIdAndUpdate(req.params.id, {
        status: PaymentStatus.DONE,
      });
      const cart = await CartModel.findByIdAndUpdate(payment?.cartId, {
        status: CartStatus.PAYED,
        products: [],
      });
      if (payment && cart) {
        return this.successResponse(res, {
          message: "Your payment was successfully processed",
        });
      }
      return this.errorResponse(res, {
        message: "Payment or cart does not exist",
      });
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
}

export default new PaymentController();
