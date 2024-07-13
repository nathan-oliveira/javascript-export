console.log(true + 2) // 3 -> foi validado internamento com 1 para o resultado ser três

console.log('21' + true) // 21true
console.log('20' - true) // 20

console.log(9999999999999999) // 10000000000000000

console.log(0.1 + 0.2) // 0.30000000000000004
console.log((0.1 + 0.2) === 0.3) // false

console.log(3 > 2) // true
console.log(2 > 1) // true
console.log(3 > 2 > 1) // false
console.log(3 > 2 >= 1) // true

console.log('21' - - 1) // 22

// vai fazer a coercao implicita por baixo dos panos, vai tentar conveter esse valor
console.log('1' == 1) // true (por baixo dos panos ele converteu string para number)
// não vai converter, vai comparar o valor do jeito que ele é
console.log('1' === 1) // false

console.log("B" + "a" + + "a" + "a") // BaNaNa

// wtfjs.com


console.log(String(123)) // '123'  // para fazer uma conversão explicita chama a função

console.log(123 + '') // '123'  // para fazer a conversão implicitamente chama e soma com uma string

console.assert(String(123) === '123', 'explicit convertion to string')
console.assert(123 + ''  === '123', 'implicit convertion to string')


if (null || 1) {
  console.log('ae!')
}
// ae!

if ('hello' || 1) {
  console.log('hello!')
}
// hello!

const r = 'hello' || 1;
console.log(r) // 'hello'  // retorna o valor da expressão
console.log(('hello' || 1) === 'hello') // true // sempre retorna o valor do primeiro elemento
console.log(('hello' && 123) === 123) // true // sempre retorna o ultimo elemento se os dois forem true
console.log(('hello' && 123) === 'hello') // false



const item = { name: 'Nathan', age: 24 }
console.log(item + 0) // [object Object]0 // isso é uma coercao implicita

const item2 = {
  name: 'Nathan',
  age: 24,
  toString() {
    return `Name ${this.name}, Age: ${this.name}`
  },
}
console.log(item2 + 0) // Name Nathan, Age: Nathan0

const item3 = {
  name: 'Nathan',
  age: 24,
  toString() {
    return `Name ${this.name}, Age: ${this.name}`
  },
  valueOf() {
    return 7; // 007
  },
}
console.log(item3 + 0) // 7 -> se valueOf não retornar um tipo primitivo, vai ser chamado o toString

const item4 = {
  name: 'Nathan',
  age: 24,
  // se for string vai ser chamado primeiro, mas se não for primitivo vai chamar o valueOf
  toString() {
    return `Name ${this.name}, Age: ${this.name}`
  },
  // se for number vai chamar primeiro, caso contrario vai ser chamado o toString
  valueOf() { // tem prioridade
    return 7; // 007
  },
}
console.log(''.concat(item4)) // Name Nathan, Age: Nathan
console.log(String(item4)) // Name Nathan, Age: Nathan (toString)
console.log(Number(item4)) // 7 (valueOf)


const item5 = {
  name: 'Nathan',
  age: 24,
  toString() {
    return `Name ${this.name}, Age: ${this.name}`
  },
  valueOf() {
    return { hey: 'dude' }
  },
}
console.log(String(item5)) // Name Nathan, Age: Nathan (toString)
console.log(Number(item5)) // NaN (valueOf) // vai retornar um NaN pois o toString retornou a string

const item6 = {
  name: 'Nathan',
  age: 24,
  toString() {
    return `Name ${this.name}, Age: ${this.name}`
  },
  valueOf() {
    return { hey: 'dude' }
  },
  [Symbol.toPrimitive](coercionType) {
    console.log('trying to convert to ', coercionType)
  },
}

console.log(String(item6))
// trying to convert to string
// undefined
console.log(Number(item6))
// trying to convert to number
// NaN



const item7 = {
  name: 'Nathan',
  age: 24,
  toString() {
    return `Name ${this.name}, Age: ${this.name}`
  },
  valueOf() {
    return { hey: 'dude' }
  },
  [Symbol.toPrimitive](coercionType) {
    console.log('trying to convert to ', coercionType)
    // hash table
    const types = {
      string: JSON.stringify(this),
      number: '0007'
    }

    return types[coercionType]
  },
}

console.log(String(item7))
// trying to convert to  string
// {"name":"Nathan","age":24}
console.log(Number(item7))
// trying to convert to number
// 7

console.log(new Date(item7))
// trying to convert to  default -> default é sempre boolean
// Invalid Date


const item8 = {
  name: 'Nathan',
  age: 24,
  toString() {
    return `Name ${this.name}, Age: ${this.name}`
  },
  valueOf() {
    return { hey: 'dude' }
  },
  [Symbol.toPrimitive](coercionType) {
    console.log('trying to convert to ', coercionType)
    // hash table
    const types = {
      string: JSON.stringify(this),
      number: '0007'
    }

    return types[coercionType] || types.string
  },
}

console.log(item8 + 0) // {"name":"Nathan","age":24}0
console.log(!!item8) // true

console.log('Ae'.concat(item8)) // Ae{"name":"Nathan","age":24}

// implicit + explicit coercion
console.log(item8 == String(item8)) // true
console.log(item8 === String(item8)) // false

const item8Copy = { ...item8, name: 'Zézin', age: 20 }
console.log(item8Copy.name === 'Zézin' && item.age === 20) // false
