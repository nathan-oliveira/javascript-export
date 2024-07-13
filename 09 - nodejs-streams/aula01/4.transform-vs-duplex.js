import { Duplex, Transform } from 'stream'

let count = 0;
const server = new Duplex({
  objectMode: true, // faz não precisar trabalhar com buffer mas gasta mais memoria
  encoding: 'utf-8',
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <=5) {
        this.push('My name is Nathan-' + count);
        return;
      }

      clearInterval(intervalContext)
      this.push(null)
    }
    setInterval(function() { everySecond(this) })
  },

  // é como se fosse um objeto completamente diferente! independente
  write(chunk, encoding, cb) {
    console.log(`[write] saving`, chunk)
    cb()
  },
})

// provar que são canais de comunicação diferentes
// write aciona o writable do Duplex
server.write('[duplex] hey this is a writable!\n')
// on data -> loga o que rolou no .push do readable
// server.on('data', msg => console.log(`[readable]${msg}`))

// o push deixa você enviar mais dados
server.push(`[duplex] hey this is also a readable!\n`)



// server
//   .pipe(process.stdout)


const transformToUpperCase = Transform({
  objectMode: true,
  transform(chunk, enc, cb) {
    cb(null, chunk.toUpperCase())
  }
})

// o transform é também um duplex, mas não possui comunicação independente
transformToUpperCase.write('[transform] hello from write!')
// o push vai ignorar o que voce tem na função transform
transformToUpperCase.push('[transform] hello from push!\n')

server
  .pipe(transformToUpperCase)
  .pipe(server) // redireciona todos os dados de readable para writable da duples