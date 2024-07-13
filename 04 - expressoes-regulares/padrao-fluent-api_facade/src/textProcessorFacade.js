const TextProcessorFluentAPI = require('./textProcessorFluentAPI')

export class TextProcessorFacade {
  #textProcessorFluentAPI

  constructor(text) {
    this.#textProcessorFluentAPI = new TextProcessorFluentAPI(text)
  }

  getPeopleFromPDF() {
    return this.#textProcessorFluentAPI
      .extractPeopleDate()
      .divideTextInColumns()
      .removeEmptyCharacters()
      .mapPerson()
      .build()
  }
}

module.exports = TextProcessorFacade
