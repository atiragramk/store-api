import { Request, Response } from "express";
import { BasicController } from "./basic.controller";
import * as yup from "yup";

class ProductsController extends BasicController {
  productCreateSchema: any;
  constructor(private productService: any = productService) {
    super();
    this.productCreateSchema = yup.object().shape({
      name: yup.string().required(),
      category: yup.string().required(),
      price: yup.number().required(),
    });
  }
  async createProduct(req: Request, res: Response) {
    try {
      await this.productCreateSchema.validate(req.body);
      const { name, category, price } = req.body;
      const product = await this.productService.createProduct(
        name,
        category,
        price
      );
      return this.successResponse(res, product);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
}

export default ProductsController;
