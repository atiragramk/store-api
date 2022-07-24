import { Schema, model, Types } from "mongoose";
import { CartStatus, TCart } from "../types";
import ModelMixIn from "../mixIns";

const productsCartSchema = new Schema({
  productId: { type: Object, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
});

export const cartSchema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true },
    products: { type: [productsCartSchema], default: [] },
    status: {
      type: String,
      enum: [CartStatus.ACTIVE, CartStatus.DELETED, CartStatus.PAYED],
      default: CartStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

class Cart extends ModelMixIn<TCart>("cart", cartSchema) {
  getCartModelByIdAndStatus(id: Types.ObjectId) {
    return this.model.findOne({ _id: id, status: CartStatus.ACTIVE });
  }

  setStatusDeletedById(id: string) {
    return this.model.findByIdAndUpdate(id, { status: CartStatus.DELETED });
  }

  getCartModelByUserId(id: string) {
    return this.model.findOne({ userId: id });
  }

  setStatusPayedByPaymentId(id: Types.ObjectId) {
    return this.model.findByIdAndUpdate(id, {
      status: CartStatus.PAYED,
    });
  }
}
export default Cart;
