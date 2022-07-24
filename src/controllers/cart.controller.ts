import { Request, Response } from "express";
import { BasicController } from "./basic.controller";
import * as yup from "yup";

class CartController extends BasicController {
  cartCreateSchema: any;
  constructor(private cartService: any = cartService) {
    super();
    this.cartCreateSchema = yup.object().shape({
      userId: yup.string().required(),
    });
  }

  async getCartById(req: Request, res: Response) {
    try {
      const cart = await this.cartService.getCartById(req.params.id);
      return this.successResponse(res, cart);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async createOrder(req: Request, res: Response) {
    try {
      await this.cartCreateSchema.validate(req.body);
      const { userId, productId, quantity } = req.body;
      const cart = await this.cartService.createOrder(
        userId,
        productId,
        quantity
      );
      return this.successResponse(res, cart);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async cancelOrder(req: Request, res: Response) {
    try {
      const cart = await this.cartService.setDeletedCartStatus(req.params.id);
      if (!cart) {
        throw Error("The cart does not exist");
      }
      await this.cartService.setCanceledPaymentStatus(cart._id);
      return this.successResponse(res, { message: "Your order was cancelled" });
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const { productId, quantity } = req.body;
      const cart = await this.cartService.updateOrder(
        req.params.id,
        productId,
        quantity
      );
      return this.successResponse(res, cart);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
}

export default CartController;
