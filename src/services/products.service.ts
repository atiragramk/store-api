import Products from "../models/products.model";

class ProductService {
  constructor(private product: Products = new Products()) {}

  createProduct(name: string, category: string, price: number) {
    const product = new this.product.model({ name, category, price });
    return product.save();
  }
}

export default ProductService;
