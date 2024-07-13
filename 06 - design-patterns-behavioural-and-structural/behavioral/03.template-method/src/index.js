import OrderBusiness from './business/orderBusiness.js'
import Order from './entities/order.js'

const order = new Order({
  customerId: 1,
  amount: 100.000,
  products: [{ description: 'ferrari' }]
})

const orderBusiness = new OrderBusiness()
const result = orderBusiness.create(order)
console.info('orderCreate', result)