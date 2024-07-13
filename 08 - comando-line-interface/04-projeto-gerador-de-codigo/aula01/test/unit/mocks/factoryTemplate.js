export default `
import ProductService from '../productService.js';
import ProductRepository from '../productRepository.js';

export default class ProductFactory {
  static getInstance() {
    const repository = new ProductRepository();
    const service = new ProductService({ repository })
    return service;
  }
}`;
