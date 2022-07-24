import { Types } from "mongoose";
import Cart from "../models/cart.model";
import Payment from "../models/payment.model";

class PaymentService {
  constructor(
    private cart: Cart = new Cart(),
    private payment: Payment = new Payment()
  ) {}

  async updatePayment(id: Types.ObjectId) {
    const payment = await this.payment.setStatusDoneById(id);
    if (!payment) {
      throw new Error("Payment does not exist");
    }
    const cart = await this.cart.getCartModelByIdAndStatus(payment.cartId);
    if (!cart) {
      throw new Error("The cart was deleted or payed");
    }
    if (cart.products.length == 0) {
      throw new Error("The cart is empty");
    }
    await this.cart.setStatusPayedByPaymentId(payment.cartId);
    cart.save();
    return payment.save();
  }
}

export default PaymentService;
