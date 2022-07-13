import { Request, Response } from "express";
import { BasicController } from "./basic.controller";
import ProductModel from "../models/products.model";
import PaymentModel from "../models/payment.model";
import { PaymentStatus } from "../types";
import { CartStatus } from "../types";
import CartModel from "../models/cart.model";
// import { TProduct, TCart } from "../types";

// const setProductsToCart = (product: TProduct, cart: TCart, req: Request) => {
//   const productCart = {
//     productId: req.body.productId,
//     quantity: req.body.quantity,
//     total: req.body.quantity * product.price,
//   };
//   cart.products = [...cart.products, productCart];
// };

class CartController extends BasicController {
  async createOrder(req: Request, res: Response) {
    try {
      const cart = await CartModel.findOne({ userId: `${req.body.userId}` });
      if (cart) {
        const product = await ProductModel.findById(req.body.productId);
        await PaymentModel.findOneAndUpdate(
          { cartId: cart._id },
          { status: PaymentStatus.CREATED }
        );
        if (product) {
          const productCart = {
            productId: req.body.productId,
            quantity: req.body.quantity,
            total: req.body.quantity * product.price,
          };
          cart.products = [...cart.products, productCart];
          cart.status = CartStatus.ACTIVE;
          cart.save();
          return this.successResponse(res, cart);
        }
      } else {
        const cart = new CartModel();
        const payment = new PaymentModel({ cartId: cart._id });
        payment.save();
        const product = await ProductModel.findById(req.body.productId);
        if (product) {
          const productCart = {
            productId: req.body.productId,
            quantity: req.body.quantity,
            total: req.body.quantity * product.price,
          };
          cart.products = [...cart.products, productCart];
          cart.userId = req.body.userId;
          cart.save();
          return this.successResponse(res, cart);
        }
      }
      return this.errorResponse(res, { message: "Product does not exist" });
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async cancelOrder(req: Request, res: Response) {
    try {
      const cart = await CartModel.findByIdAndUpdate(req.params.id, {
        products: [],
        status: CartStatus.DELETED,
      });
      await PaymentModel.findOneAndUpdate(
        {
          cartId: cart?._id,
        },
        { status: PaymentStatus.CANCELED }
      );
      return this.successResponse(res, { message: "Your order was cancelled" });
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
  async updateOrder(req: Request, res: Response) {
    try {
      const cart = await CartModel.findById(req.params.id);
      const model = new CartModel(cart);
      const products = model.products.filter(
        (product) => product.productId !== req.body.productId
      );
      model.set({ products: products });
      model.save();
      return this.successResponse(res, model);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
}

export default new CartController();
