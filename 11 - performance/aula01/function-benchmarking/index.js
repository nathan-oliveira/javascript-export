import Benchmark from 'benchmark'

// import CardIdOld from './cart-id-old.js';
// import CardIdNew from './cart-id-new.js';
// import CartRmPropOld from './cart-rm-prop-old.js';
// import CartRmPropNew from './cart-rm-prop-new.js';
import database from './../database.js'
import CartPriceOld from './cart-price-old.js';
import CartPriceNew from './cart-price-new.js';

const suite = new Benchmark.Suite;

/* randomUIID é mais rápido */
// suite
//   .add('Cart#cartIdUUID', function () {
//     new CardIdOld()
//   })
//   .add('Cart#cartIdCrypto', function () {
//     new CardIdNew()
//   })
//   .on('cycle', (event) => console.log(String(event.target)))
//   .on('complete', function() {
//     console.log(`Fastest is ${this.filter('fastest').map('name')}`)
//   })
//   .run({ async: true })


// const data = {
//   products: [
//     {
//       id: 'ar',
//       n: undefined,
//       abc: undefined,
//       a: null,
//       b: 123,
//     },
//     {
//       id: 'ae',
//       n: undefined,
//       abc: undefined,
//       a: null,
//       b: 123,
//     }
//   ]
// }

// /* FOR é mais rápido */
// suite
//   .add('Cart#cartRmPropOld - MapReduce', function () {
//     new CartRmPropOld(data)
//   })
//   .add('Cart#cartRmPropNew - For', function () {
//     new CartRmPropNew(data)
//   })
//   .on('cycle', (event) => console.log(String(event.target)))
//   .on('complete', function() {
//     console.log(`Fastest is ${this.filter('fastest').map('name')}`)
//   })
//   .run({ async: true })


suite
  .add('Cart#cartPriceOld - MapReduce', function () {
    new CartPriceOld(database)
  })
  .add('Cart#cartPriceNew - For', function () {
    new CartPriceNew(database)
  })
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run({ async: true })
