import { createServer } from 'http'
import { appendFile } from 'fs/promises'

export function initializeServer() {
  async function handler(request, response) {
    await appendFile('./log.txt', 'processed by ' + process.pid)
    const result = Array.from({ length: 1e3 }, _ => Math.floor(Math.random() * 40))
      .reduce((prev, next) => prev + next, 0);
    response.end(result.toString())
  }

  createServer(handler).listen(3000, () => console.log('server running at 3000 and '+ process.pid));
  // para quebrar o servidor
  // setTimeout(() => process.exit(1), Math.random() * 1e4)
}