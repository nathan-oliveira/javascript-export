// import { v4 as uuid } from 'uuid'
import Product from "../src/entities/product.js";

export default class Cart {
  constructor({ at, products }) {
    this.products = this.removeUndefinedProps(products);
  }

  removeUndefinedProps(products) {
    const result = [];
    for (const product of products) {
      const keys = Reflect.ownKeys(product)
      if (!keys.length) continue;
      // keys.forEach((key) => product[key] || Reflect.deleteProperty(product, key))
      // result.push(new Product(product))

      let newObjet = {}
      keys.forEach((key) => {
        if (!keys[key]) return;
        newObjet[key] = keys[key];
      })
      result.push(new Product(newObjet))
    }

    return result
  }
}
