const { watch, promises: { readFile } } = require('fs')

class File {
  watch(event, filename) {
    console.log('this', this)
    console.log('arguments', Array.prototype.slice.call(arguments)) // má pratica usar (apply)
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}

const file = new File();

// dessa forma ele ignora o this da classe File e herda o this do watch de fs
// watch(__filename, file.watch)

// alternativa feia: para não herdar o this da função
// watch(__filename, (event, filename) => file.watch(event, filename))

// podemos deixar explicito qual é o contexto que a função deve seguir
// bind retornar uma função com o 'this' que se mantém de file, ignorando o watch
watch(__filename, file.watch.bind(file))

//
// file.watch.call(
//   { showContent: () => console.log('call') },
//   null,
//   __filename,
// )

// file.watch.apply(
//   { showContent: () => console.log('call') },
//   [null, __filename],
// )
