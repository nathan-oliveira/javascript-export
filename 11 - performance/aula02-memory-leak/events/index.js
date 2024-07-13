import { createServer } from 'http'

import Events from 'events'
import { randomBytes } from 'crypto'

const myEvents = new Events()

function onBytes() {
  return randomBytes(10000)
}

function onData() {
  onBytes()
  const items = []
  setInterval(function myInterval() { items.push(Date.now()) })
}


createServer(
  function handler (request, response) {
    myEvents.on('data', onData)

    myEvents.emit('data', Date.now())

    response.end('ok');
  }
)
.listen(3000, () => console.log('running at 3000'))
// process.memoryUsage()

// npx clinic --help

// npm run clinic-doctor
// npm run test

// npm run clinic-flame
// npm run test

// npm run clinic-heapprofiler
// npm run test

