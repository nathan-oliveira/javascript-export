import { Readable, Writable } from 'stream'

// fonte de dados
const readable = Readable({
  read() {
    this.push('Hello World 1')
    this.push('Hello World 2')
    this.push('Hello World 3')
    // informa que os dados acabaram
    this.push(null)
  }
})

// saida de dados
const writable = Writable({
  white(chunk, enconding, cb) {
    console.log('msg', chunk.toString())
    cb()
  }
})

readable
  .pipe(writable) // writable é sempre a saida -> imprimir, salvar, ignorar |// .pipe(process.stdout)
