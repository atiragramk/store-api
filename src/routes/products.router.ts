import express from "express";
import ProductController from "../controllers/products.controller";
import ProductService from "../services/products.service";
import Products from "../models/products.model";
const productController = new ProductController(
  new ProductService(new Products())
);

const router = express.Router();

router.post("/", productController.createProduct.bind(productController));

export default router;
