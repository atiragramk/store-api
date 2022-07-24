import { Types } from "mongoose";
import Cart from "../models/cart.model";
import Payment from "../models/payment.model";
import Products from "../models/products.model";
import { TProduct, TProducts } from "../types";

class CartService {
  constructor(
    private cart: Cart = new Cart(),
    private payment: Payment = new Payment(),
    private product: Products = new Products()
  ) {}

  async getCartById(id: Types.ObjectId) {
    const cart = await this.cart.getCartModelByIdAndStatus(id);
    if (!cart) {
      throw new Error("The cart was deleted or payed");
    }
    return cart;
  }

  createCart(userId: string) {
    return new this.cart.model({ userId });
  }

  async createOrder(
    userId: string,
    productId: Types.ObjectId,
    quantity: number
  ) {
    const existCart = await this.getCardByUserId(userId);
    if (existCart) {
      throw new Error("The cart is already exist");
    }
    const cart = this.createCart(userId);
    const payment = new this.payment.model({ cartId: cart._id });
    payment.save();
    if (!productId) {
      return cart.save();
    }
    const product = await this.product.getProductModelById(productId);
    if (!product) {
      throw new Error("The product does not exist");
    }
    const products = this.setProductList(product, quantity);
    cart.products = [products];
    return cart.save();
  }

  getCardByUserId(userId: string) {
    return this.cart.getCartModelByUserId(userId);
  }

  createPayment(cartId: Types.ObjectId) {
    const payment = new this.payment.model({ cartId });
    return payment.save();
  }

  setProductList(product: TProduct, quantity: number) {
    return {
      productId: product._id,
      quantity,
      total: quantity * product.price,
    };
  }

  async setDeletedCartStatus(id: string) {
    const cart = await this.cart.setStatusDeletedById(id);
    return cart?.save();
  }

  async setCanceledPaymentStatus(id: string) {
    const payment = await this.payment.setStatusCanceledById(id);
    return payment?.save();
  }

  async updateOrder(
    id: Types.ObjectId,
    productId: Types.ObjectId,
    quantity: number
  ) {
    const cart = await this.getCartById(id);
    if (!cart) {
      throw new Error("The cart was deleted or does not exist");
    }
    const products = cart.products.map(async (productItem: TProducts) => {
      const product = await this.product.getProductModelById(
        productItem.productId
      );
      if (!product) {
        throw new Error("The product does not exist");
      }
      return this.setProductList(product, productItem.quantity);
    });
    const product = await this.product.getProductModelById(productId);
    if (!product) {
      throw new Error("The product does not exist");
    }
    const productItem = this.setProductList(product, quantity);
    cart.products = [...(await Promise.all(products)), productItem];
    return cart.save();
  }
}

export default CartService;
