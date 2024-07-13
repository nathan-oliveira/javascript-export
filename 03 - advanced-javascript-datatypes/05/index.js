// garantir semantica e segurança em objetos

// ---- apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  }
}
console.log(myObj.add.apply({ arg1: 10, arg2: 20 }, [100])) // 130

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('eita') }

// esse aqui pode acontecer!
// myObj.add.apply = () => { throw new TypeError('eita') }
/*
assert.throws(
  () => myObj.add.apply({}, []),
  {
    name: 'TypeError',
    message: 'eita'
  }
)
*/

// não deixa substituir
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [260])

// questoes semanticas
function MyDate() {}
// assim é feio, tudo é Object adicionando prop para um function
Object.defineProperties(MyDate, 'withObject', { value: () => 'Hey there' })
// assim é melhor:
Reflect.defineProperty(MyDate, 'withObjectReflection', { value: () => 'Hey there' })

// ---- deleteProperty

// imperformático, evitar ao máximo:
const withDelete = { user: 'Nathan' }
delete withDelete.user

// user assim, pois, respeita o ciclo de vida do javascript:
const withDelete2 = { user: 'Nathan' }
Reflect.deleteProperty(withDelete2, 'user')

// ---- get

// Deveriamos fazer um get somente em instancias de referencia
// 1['userName']
// com reflection, vai estourar uma exceção
// Reflect.get(1, 'userName')
// assert.throws(() => Reflect.get(1, 'userName'), TypeError)

// ---- has

// 'superman' in { superman: '' } // busca chave superman

// com Reflect:
// Reflect.has({ superman: '' }, 'superman')

// ---- ownKeys

const userSymbol = Symbol('user');
const databaseUsers = {
  id: 1,
  [Symbol.for('password')]: 123,
  [userSymbol]: 'nathan'
}

// com os metodos de objecct, temos que fazer 2 requisicoes
// const objectKeys = [
//   ...Object.getOwnPropertyNames(databaseUsers),
//   ...Object.getOwnPropertySymbols(databaseUsers)
// ]

// Com reclection, só um método
const objectKeys = Reflect.ownKeys(databaseUsers)