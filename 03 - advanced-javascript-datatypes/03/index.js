const myMap = new Map()
// podem ter qualquer coisa como chave
myMap
  .set(1, 'one')
  .set('Nathan', { text: 'two' })
  .set(true, () => 'hello')

const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1'],
])

console.log(myMapWithConstructor.get(''))

// Em Objects a chave só pode ser string ou symbol (number é ccoergido a string)
const onlyReferenceWorks = { id: 1 }
myMap.set(obj, { name: 'Nathan' })
console.log(myMap.get(onlyReferenceWorks))

// utilitarios
// No Object seria Object.keys({ a: 1 }).length

// myMap.size

// para verificar se um item existe no objeto
// item.key = se nao existe = undefined
// if () = coerção implicita para boolean e retorna false
// O jeito certo em Object é ({ name: 'Nathan' }).hasOwnProperty('name')
console.log(myMap.has(onlyReferenceWorks)) // assert.ok

// para remover um item do objeto
// delete item.id
// imperformática para o javascript
myMap.delete(onlyReferenceWorks)

// Não dá para iterar em objects diretamente
// tem que transformar com o Object.entries(item)
console.log(JSON.stringify([...myMap]))

// for (const [key, value] of myMap) {
//   console.log(key, value)
// }
// Object é inseguro, pois, dependendo do nome da chave, pode substituir algum comportamento padrao, exemplo: ({}).toString() => '[object Object]' ou ({ toString: () => 'hello' }).toString()

// qualquer chave pode colidir, com as propriedades heradas do objecto, como
// constructor, toString, valueOf e etc

const actor = {
  name: 'Xuxa',
  toString: 'Que'
}
myMap.set(actor)
// Nao da para limpar um Obj sem reassina-lo
myMap.clear()

// [...myMap.keys()]


// --- WeakMap

// Pode ser coletado após perder as referencias
// usado em casos bem específicos
// tem a maioria dos beneficios do Map
// MAS: não é iterável
// Só chaves de referencia e que você já conheça
// mais lveve e preve leak de memoria, pq depois que as instancias saem da memoria, tudo é limpo
const weakMap = new WeakMap()
const hero = { name: 'Flash' }

weakMap.set(hero) // delete(hero), get(hero), has(hero), set(hero)