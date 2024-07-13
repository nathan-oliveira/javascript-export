const { deepStrictEqual } = require('assert')

const obj = {}
const arr = []
const fn = () => {}

// internamente, objetos liberais por baixo dos panos viram funções explicitas

console.log(new Object().__proto__ === {}.__proto__) // true
deepStrictEqual(new Object().__proto__, {}.__proto__) // valida internamente o objeto para saber se é igual ou não
// __proto__ é a referencia do objeto que possui as proriedades nele
console.log(obj.__proto__ === Object.prototype) // true
console.log(fn.__proto__ === Function.prototype) // true

// o __proto__ de Object.prototype é null
// tudo no javascript herda de Object e o Object herda de null
console.log(obj.__proto__.__proto__) // null

// diferença entre null e undefined
//  null é utilizado para indicar a ausência de um objeto, enquanto undefined indica a ausência de um valor qualquer


// ================ ES5 ================
function Employee() {}
Employee.prototype.salary = () => "salary**"
console.log(Employee.prototype.salary()) // "salary**"

function Supervison() {}
// herda a instancia de employee -> herança
Supervison.prototype = Object.create(Employee.prototype)
Employee.prototype.profitShare = () => "profitShare**"
console.log(Supervison.prototype.salary()) // "salary**"
console.log(Supervison.prototype.profitShare()) // "profitShare**"

function Manager() {}
Manager.prototype = Object.create(Supervison.prototype)
Manager.prototype.monthlyBonuses = () => "monthlyBonuses**"

console.log(Manager.prototype.salary())
// se não chamar o new, o primeiro __proto__ vai ser sempre a instancia de Function, sem herdar nossas classes
console.log(new Manager().salary())

console.log('test: %s, test2: $s', 1,2) // test: 1, test2: $s 2

console.log(Manager.prototype.__proto__ === Supervison.prototype) // true
console.log(Supervison.prototype === new Manager().__proto__.__proto__) // true]

const manager = new Manager()
console.log(manager.salary()); // "salary**"
console.log(manager.profitShare()); // "profitShare**"
console.log(manager.monthlyBonuses()); // "monthlyBonuses**"

console.log(manager.__proto__) //Employee {monthlyBonuses: ƒ}
console.log(manager.__proto__.__proto__) // Employee {}
console.log(manager.__proto__.__proto__.__proto__) // {salary: ƒ, profitShare: ƒ}
console.log(manager.__proto__.__proto__.__proto__.__proto__) // {}
console.log(manager.__proto__.__proto__.__proto__.__proto__.__proto__) // null

// ================ ES6 ================
/* 
class Employee {
  salary() {
    return "salary**";
  }
}

class Supervison extends Employee {
  profitShare() {
    return "profitShare**";
  }
}

class Manager extends Supervison {
  monthlyBonuses() {
    return "monthlyBonuses**";
  }
}

const employee = new Employee();
console.log(employee.salary()); // "salary**"

const supervison = new Supervison();
console.log(supervison.salary()); // "salary**"
console.log(supervison.profitShare()); // "profitShare**"

const manager = new Manager();
console.log(manager.salary()); // "salary**"
console.log(manager.profitShare()); // "profitShare**"
console.log(manager.monthlyBonuses()); // "monthlyBonuses**"
*/

class T1 {
  ping() { return 'ping' }
}


class T2 extends T1 {
  pong() { return 'pong' }
}

class T3 extends T2 {
  shoot() { return 'shoot' }
}

const t3 = new T3();
console.log(t3.__proto__) // T2 {}
console.log(t3.__proto__.__proto__) // T1 {}
console.log(t3.__proto__.__proto__.__proto__) // {}
console.log(t3.__proto__.__proto__.__proto__.__proto__) // {}
console.log(t3.__proto__.__proto__.__proto__.__proto__.__proto__) // null