import { Request, Response } from "express";
import ProductModel from "../models/products.model";
import { BasicController } from "./basic.controller";

class ProductsController extends BasicController {

  async createProduct(req: Request, res: Response) {
    try {
      const product = new ProductModel(req.body);
      await product.save();
      return this.successResponse(res, product);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
}

export default new ProductsController();