import { Request, Response } from "express";
import { BasicController } from "./basic.controller";

class PaymentController extends BasicController {
  constructor(private paymentService: any = paymentService) {
    super();
  }

  async updatePayment(req: Request, res: Response) {
    try {
      const payment = await this.paymentService.updatePayment(req.params.id);
      return this.successResponse(res, payment);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
}

export default PaymentController;
