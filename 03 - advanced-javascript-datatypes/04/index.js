// usado na maioria das vezes para lista de itens unicos
const arr1 = ['0','1','2']
const arr2 = ['2','0','3']
const arr3 = arr1.concat(arr2)
console.log(arr3) // ['0','1','2','2','0','3'] // arr3.sort() vai ordenar

// Não traz valores duplicados
const set = new Set()
arr1.map((value) => set.add(value))
arr2.map((value) => set.add(value))
console.log(set) // { '0','1','2','3' }
console.log(Array.from(set)) // ['0','1','2','3']

// rest/spread
const set2 = Array.from(new Set([...arr1, ...arr2]));
console.log(set2) // ['0','1','2','3']

// retorna a mesma coisa (só para mentar a compatibilidade) a diferença é que um trabalha com lista e o outro vai ser um chave.
// set2.keys() e set2.values() // so existe por conta do Map

// no array comum, para saber se um item existe
// ['1'].indexOf('1') !== -1 ou [0].includes(0)
console.log(set2.has('3'))
// mesma teoria do Map, mas você sempre trabalha com a lista toda
// não tem get, então você pode saber se o item está ou não está no array e é isso...
// na documentação tem exemplos sobre. como fazer a interceção, saber o que tem em uma lista e nao
// tem na outra e assim por diante

// tem nos dois arrays
const users01 = new Set(['nathan','oliveira'])
const users02 = new Set(['mendonca','nathan'])

const intersection = new Set([...users01].filter(user => users02.has(user)))
const difference = new Set([...users01].filter(user => !users02.has(user)))

// weakSet
// mesma ideia do WeakMap
// nao é enumerável (iterável, não pode rodar no for)
// só trabalha com chaves como referencia
// só tem metodos simples
const user = { id: 123 }
const user2 = { id: 321 }
const weakSet = new WeakSet({ user })
weakSet.add(user2) // add, delete, has