import { Schema, model, Types } from "mongoose";
import { CartStatus } from "../types";

const productsCartSchema = new Schema({
  productId: { type: Object, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
});


export const cartSchema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true },
    products: {type: [productsCartSchema], default: []},
    status: {
      type: String,
      enum: [CartStatus.ACTIVE, CartStatus.DELETED, CartStatus.PAYED],
      default: CartStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

export default model("cart", cartSchema);
