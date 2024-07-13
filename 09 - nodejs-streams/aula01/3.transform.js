import { Readable, Writable, Transform } from 'stream'
import { createWriteStream } from 'fs'

// fonte de dados
const readable = Readable({
  read() {
    // 1.000.000 = 1e6
    for (let index = 0; index < 2; index++) {
      const person = { id: Date.now() + index, name: `Nathan-${index}` }
      const data = JSON.stringify(person)
      this.push(data)
    }

    this.push(null)
  }
})



// processamento dos dados
const mapFields = Transform({
  transform(chunk, encoding, cb) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name.toUpperCase()}\n`

    cb(null, result) // primeiro parametro é erro, segundo é sucesso.
  }
})

const mapHeaders = Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return cb(null, chunk)
    }

    this.counter +=1;
    return cb(null, 'id,name\n'.concat(chunk))
  }
})


// saida de dados
// const writable = Writable({
//   white(chunk, enconding, cb) {
//     console.log('msg', chunk.toString())
//     cb()
//   }
// })

// pode dar memory leak
const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  .pipe(createWriteStream('my.csv'))

  pipeline
    .on('end', () => console.log('acabou!'))