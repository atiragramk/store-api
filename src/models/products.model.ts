import { Schema, model, Types } from "mongoose";
import ModelMixIn from "../mixIns";
import { TProduct } from "../types";

const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

class Products extends ModelMixIn<TProduct>("products", productsSchema) {
  getProductModelById(id: Types.ObjectId) {
    return this.model.findById(id);
  }
}
export default Products;
