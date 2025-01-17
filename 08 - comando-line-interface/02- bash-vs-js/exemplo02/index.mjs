// npm config set init.author.name "nathan"

// github.com/google/zk
// npm i zk
// npm i safe-regex

$.verbose = false

import { setTimeout } from 'timers/promises'
import isSafe from 'safe-regex'

await $`docker run -p "8080:80" -d nginx`
await setTimeout(500)
const req = await $`curl --silent localhost:8080`
console.log(`req\n`, req.stdout)
const containers = await $`docker ps`
// exemplo de unsafe => exp com o (x+x+)+y
const exp = /(?<containerId>\w+)\W+(?=nginx)/
if (!isSafe(exp))
  throw new Error('unsafe regex!!')

const { groups: { containerId } } = containers.toString().match(exp)


const logs = await $`docker logs ${containerId}`
console.log(`logs\n`, logs.stdout)

const rm = await $`docker rm -f ${containerId}`
console.log(`rm -f\n`, rm.stdout)