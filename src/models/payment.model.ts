import { Schema, model, Types } from "mongoose";
import { PaymentStatus } from "../types";



const paymentSchema = new Schema(
  {
    cartId: { type: Types.ObjectId, required: true },
    status: {
      type: String,
      required: true,
      enum: [PaymentStatus.CREATED, PaymentStatus.CANCELED, PaymentStatus.DONE],
      default: PaymentStatus.CREATED,
    },
  },
  { timestamps: true }
);

export default model("payment", paymentSchema);
