class TextProcessorFluentAPI {
  // propriedade privada
  #content

  constructor(content) {
    this.#content = content
  }

  extractPeopleDate() {
    const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*)$/gmi
    // matchPerson.test(this.#content) // retorna true ou false
    const onlyPerson = this.#content.match(matchPerson) // vai retornar o texto de acordo com o que está no regex
    this.#content = onlyPerson;
    return this;
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI
