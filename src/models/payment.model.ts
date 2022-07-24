import { Schema, model, Types } from "mongoose";
import { PaymentStatus, TPayment } from "../types";
import ModelMixIn from "../mixIns";

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

class Payment extends ModelMixIn<TPayment>("payment", paymentSchema) {
  setStatusCanceledById(id: string) {
    return this.model.findOneAndUpdate(
      { cartId: id },
      { status: PaymentStatus.CANCELED }
    );
  }
  setStatusDoneById(id: Types.ObjectId) {
    return this.model.findByIdAndUpdate(id, { status: PaymentStatus.DONE });
  }
}
export default Payment;
