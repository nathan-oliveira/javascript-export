// ls | grep package | xargs cat | jq .name
// process.stdin.pipe(process.stdout)
//   .on(('data', (msg) => {
//     console.log('data', msg.toString())
//   }))
//   .on(('error', (msg) => {
//     console.log('error', msg.toString())
//   }))
//   .on(('end', (_) => {
//     console.log('end')
//   }))
//   .on(('close', (_) => {
//     console.log('close', msg.toString())
//   }))

// terminal 1
// node -e "process.stdin.pipe(require('net').connect(1338))"
// terminal 2
// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"
// gerador aqui de 1gb
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from 'http'
import { createReadStream, readFileSync } from 'fs'

http.createServer((req, res) => {
  // má pratica
  // const file = readFileSync('big.file').toString() // se usar vai quebrar tudo, vai ser jogado em memoria
  // res.write(file)
  // res.end()

  createReadStream('big.file')
    .pipe(res)
}).listen(3000, console.log('running at 3000'))
// curl localhost:3000 -o output.txt

