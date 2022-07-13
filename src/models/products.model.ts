import { Schema, model } from "mongoose";

const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model("products", productsSchema);
