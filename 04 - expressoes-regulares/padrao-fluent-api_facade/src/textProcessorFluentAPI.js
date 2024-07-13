const { Person } = require('./person')
const { evaluateRegex } =require('./util')

class TextProcessorFluentAPI {
  // propriedade privada
  #content

  constructor(content) {
    this.#content = content
  }

  extractPeopleDate() {
    const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*)$/gmi)
    // matchPerson.test(this.#content) // retorna true ou false
    const onlyPerson = this.#content.match(matchPerson) // vai retornar o texto de acordo com o que está no regex
    this.#content = onlyPerson;
    return this;
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/)
    this.#content = this.#content.map((line) => line.split(splitRegex))
    return this;
  }

  removeEmptyCharacters() {
    const splitRegex = evaluateRegex(/^\s+|\s+$|\n/)
    this.#content = this.#content.map((row) => row.map(line => line.replace(splitRegex)))
    return this;
  }

  mapPerson() {
    this.#content = this.#content.map((line) => new Person(line))
    return this;
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI
