import express from "express";
import productController from "../controllers/products.controller";

const router = express.Router();

router.post("/", productController.createProduct.bind(productController));

export default router;
