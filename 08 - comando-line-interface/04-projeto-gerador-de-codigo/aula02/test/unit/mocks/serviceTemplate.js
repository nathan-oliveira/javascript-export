export default `
export default class ProductService {
  constructor({ repository: productRepository }) {
    this.productRepository = productRepository;
  }

  create(data) {
    this.productRepository.create(data)
  }

  read(query) {
    this.productRepository.read(query)
  }

  update(id, data) {
    this.productRepository.update(id, data)
  }

  delete(id) {
    this.productRepository.delete(id)
  }
}`;
